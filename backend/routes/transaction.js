const express = require("express");
const { authMiddleware } = require("../middleware");
const { Transaction } = require("../db");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find({
      $or: [{ from: req.userId }, { to: req.userId }],
    })
      .populate("from", "firstName lastName email")
      .populate("to", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments({
      $or: [{ from: req.userId }, { to: req.userId }],
    });

    res.json({
      transactions,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

// transaction.js
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transactionId = req.params.id;

    // Find the transaction to make sure it belongs to the logged-in user
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Optional: allow deletion only if the user is sender or receiver
    if (transaction.from.toString() !== req.userId && transaction.to.toString() !== req.userId) {
      return res.status(403).json({ message: "You can't delete this transaction" });
    }

    await Transaction.findByIdAndDelete(transactionId);

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting transaction" });
  }
});



module.exports = router;
