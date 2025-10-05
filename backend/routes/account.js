const express = require("express");
const { Account, Transaction } = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.json({ balance: account?.balance || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching balance" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = req.body;
    const senderId = req.userId;

    // Basic validation
    if (!to || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount or missing recipient" });
    }

    // Find accounts
    const senderAccount = await Account.findOne({ userId: senderId }).session(session);
    const receiverAccount = await Account.findOne({ userId: to }).session(session);

    if (!senderAccount || !receiverAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Account not found" });
    }

    // Check sufficient balance
    if (senderAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update balances
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;
    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    // Log transaction
    const transaction = await Transaction.create(
      [{
        from: senderId,
        to,
        amount,
        type: "DEBIT",
        status: "SUCCESS"
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Transfer successful", transaction: transaction[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: "Error processing transfer" });
  }
});

module.exports = router;
