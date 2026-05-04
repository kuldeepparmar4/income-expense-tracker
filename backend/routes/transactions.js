const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ──────────────────────────────────────────────
// GET /api/transactions  →  Get ALL transactions
// ──────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    // Find all transactions, sort by newest first
    const transactions = await Transaction.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ──────────────────────────────────────────────
// POST /api/transactions  →  Add a NEW transaction
// ──────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    // req.body contains the data sent from frontend (title, amount, etc.)
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ──────────────────────────────────────────────
// GET /api/transactions/:id  →  Get ONE transaction
// ──────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ──────────────────────────────────────────────
// PUT /api/transactions/:id  →  UPDATE a transaction
// ──────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id, // which transaction to update
      req.body, // new data
      { new: true, runValidators: true }, // return updated data, validate fields
    );

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ──────────────────────────────────────────────
// DELETE /api/transactions/:id  →  DELETE a transaction
// ──────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ──────────────────────────────────────────────
// GET /api/transactions/stats/summary  →  Get financial summary
// ──────────────────────────────────────────────
router.get("/stats/summary", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    // Calculate total income
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate total expenses
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Balance = income - expenses
    const balance = totalIncome - totalExpenses;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance,
        transactionCount: transactions.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
