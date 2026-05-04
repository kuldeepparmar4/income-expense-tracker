import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

// Categories split by type
const incomeCategories = ["Salary", "Freelance", "Investment", "Other"];
const expenseCategories = [
  "Food",
  "Rent",
  "Transport",
  "Entertainment",
  "Health",
  "Shopping",
  "Other",
];

function AddTransaction({ onAdd }) {
  // Form state — tracks what user has typed
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0], // today's date
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // When user types, update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // If type changes, reset category to a valid one
      ...(name === "type" && {
        category: value === "income" ? "Salary" : "Food",
      }),
    }));
  };

  // When user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    // Basic validation
    if (!formData.title || !formData.amount || Number(formData.amount) <= 0) {
      alert("Please fill all fields with valid data");
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({
        ...formData,
        amount: Number(formData.amount), // convert string to number
      });

      // Reset form after successful submission
      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const categories =
    formData.type === "income" ? incomeCategories : expenseCategories;

  return (
    <div className="add-transaction">
      <h3>Add Transaction</h3>

      <form onSubmit={handleSubmit}>
        {/* TYPE TOGGLE */}
        <div className="type-toggle">
          <button
            type="button"
            className={`toggle-btn ${formData.type === "income" ? "active-income" : ""}`}
            onClick={() =>
              handleChange({ target: { name: "type", value: "income" } })
            }
          >
            Income
          </button>
          <button
            type="button"
            className={`toggle-btn ${formData.type === "expense" ? "active-expense" : ""}`}
            onClick={() =>
              handleChange({ target: { name: "type", value: "expense" } })
            }
          >
            Expense
          </button>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Monthly Salary, Grocery Shopping"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Any extra notes..."
          />
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          <FaPlus /> {submitting ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
