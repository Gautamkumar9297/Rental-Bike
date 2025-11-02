import Transaction from "../models/Transaction.js";

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add transaction
export const addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
