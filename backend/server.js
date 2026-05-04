// Import the tools we installed
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load our secret settings from .env file
dotenv.config();

// Create the express app (our server)
const app = express();

// MIDDLEWARE — these run on every request
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Allow server to understand JSON data

// CONNECT TO MONGODB DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected!"))
  .catch((err) => console.log(" MongoDB Error:", err));

// ROUTES — when someone goes to /api/transactions, use our routes file
const transactionRoutes = require("./routes/transactions");
app.use("/api/transactions", transactionRoutes);

// HOME ROUTE — just to test the server is working
app.get("/", (req, res) => {
  res.send("Income & Expense Tracker API is running!");
});

// START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
