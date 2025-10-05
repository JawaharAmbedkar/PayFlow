const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


const { Schema } = mongoose;

const userSchema = new Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
 });

const accountSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   }, 
   balance : {
    type: Number,
    required: true
   }
});

const transactionSchema = new mongoose.Schema({
   from: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   to: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   amount: {type: Number, required: true},
   type:{type: String, enum:["DEBIT", "CREDIT"], required: true},
   status: {type: String, enum:["SUCCESS", "FAILED"], default: "SUCCESS"},
   createdAt:{type: Date, default: Date.now}
});

const Account = mongoose.model("Account", accountSchema)
const User  = mongoose.model("User", userSchema)
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = {
   User,
   Account,
   Transaction
}