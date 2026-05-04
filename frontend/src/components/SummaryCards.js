import React from "react";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

function SummaryCards({ balance, totalIncome, totalExpenses }) {
  // Helper function to format numbers as Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="summary-cards">
      {/* BALANCE CARD */}
      <div
        className={`card balance-card ${balance >= 0 ? "positive" : "negative"}`}
      >
        <div className="card-icon">
          <FaWallet />
        </div>
        <div className="card-content">
          <p className="card-label">Total Balance</p>
          <h2 className="card-amount">{formatCurrency(balance)}</h2>
          <p className="card-subtitle">
            {balance >= 0 ? "You are in profit!" : "Spending more than earning"}
          </p>
        </div>
      </div>

      {/* INCOME CARD */}
      <div className="card income-card">
        <div className="card-icon income-icon">
          <FaArrowUp />
        </div>
        <div className="card-content">
          <p className="card-label">Total Income</p>
          <h2 className="card-amount">{formatCurrency(totalIncome)}</h2>
        </div>
      </div>

      {/* EXPENSE CARD */}
      <div className="card expense-card">
        <div className="card-icon expense-icon">
          <FaArrowDown />
        </div>
        <div className="card-content">
          <p className="card-label">Total Expenses</p>
          <h2 className="card-amount">{formatCurrency(totalExpenses)}</h2>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
