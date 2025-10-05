const  express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account")
const transactionRouter = require("./transaction")
const router = express.Router();

router.use("/user",userRouter);
router.use("/account",accountRouter);
router.use("/transaction",transactionRouter);

module.exports = router;


