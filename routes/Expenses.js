const express = require("express");
const Expense = require("../models/Expense");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const expenseValidator = require("../validators/expenseValidator");


router.use(authenticateToken);

// GET all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching expenses" });
  }
});

// POST a new expense
router.post("/", async (req, res) => {
  const { error } = expenseValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user.id
    });
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// UPDATE an expense by ID (only if it belongs to this user)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Expense not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update expense" });
  }
});

// DELETE an expense by ID (only if it belongs to this user)
router.delete("/:id", async (req, res) => {
  try {
    const result = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!result) return res.status(404).json({ error: "Expense not found" });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
