const mongoose = require("mongoose");

// A "Schema" is like a template — it says what fields each transaction has
const TransactionSchema = new mongoose.Schema(
  {
    // Title: what was the transaction? e.g., "Salary", "Groceries"
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true, // removes extra spaces
      maxlength: [50, "Title cannot be more than 50 characters"],
    },

    // Amount: how much money? e.g., 5000
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
      min: [0, "Amount cannot be negative"],
    },

    // Type: is this income or an expense?
    type: {
      type: String,
      enum: ["income", "expense"], // can only be one of these two values
      required: [true, "Please specify income or expense"],
    },

    // Category: what category? e.g., Food, Salary, Rent
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "Salary",
        "Freelance",
        "Investment",
        "Food",
        "Rent",
        "Transport",
        "Entertainment",
        "Health",
        "Shopping",
        "Other",
      ],
    },

    // Date: when did this happen?
    date: {
      type: Date,
      default: Date.now, // automatically uses today's date if not given
    },

    // Description: optional extra notes
    description: {
      type: String,
      maxlength: [200, "Description too long"],
      default: "",
    },
  },
  {
    // This automatically adds "createdAt" and "updatedAt" timestamps
    timestamps: true,
  },
);

// Export this model so other files can use it
module.exports = mongoose.model("Transaction", TransactionSchema);
