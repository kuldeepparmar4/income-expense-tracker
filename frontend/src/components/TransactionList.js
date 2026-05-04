import React, { useState } from "react";
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState("all"); // 'all', 'income', 'expense'
  const [search, setSearch] = useState("");

  // Filter transactions based on selected filter and search
  const filteredTransactions = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>

      {/* FILTER BUTTONS */}
      <div className="filter-row">
        <div className="filter-buttons">
          {["all", "income", "expense"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TRANSACTIONS */}
      {filteredTransactions.length === 0 ? (
        <p className="empty-state">No transactions found.</p>
      ) : (
        <ul className="transactions">
          {filteredTransactions.map((transaction) => (
            <li
              key={transaction._id}
              className={`transaction-item ${transaction.type}`}
            >
              <div className="transaction-icon">
                {transaction.type === "income" ? (
                  <FaArrowUp className="income-color" />
                ) : (
                  <FaArrowDown className="expense-color" />
                )}
              </div>

              <div className="transaction-info">
                <p className="transaction-title">{transaction.title}</p>
                <p className="transaction-meta">
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
                {transaction.description && (
                  <p className="transaction-desc">{transaction.description}</p>
                )}
              </div>

              <div className="transaction-right">
                <p className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(transaction._id)}
                  title="Delete transaction"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
