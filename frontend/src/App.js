import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import PieChart from "./components/Charts/PieChart";
import BarChart from "./components/Charts/BarChart";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "./api/transactions";
import "./App.css";

function App() {
  // STATE — these are variables that, when changed, re-render the page
  const [transactions, setTransactions] = useState([]); // list of all transactions
  const [loading, setLoading] = useState(true); // are we loading data?
  const [error, setError] = useState(null); // any error messages?

  // FETCH DATA — runs when the page first loads
  useEffect(() => {
    fetchTransactions();
  }, []); // [] means run once when component mounts

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data.data); // store the transactions in state
    } catch (err) {
      setError(
        "Failed to load transactions. Make sure your backend is running!",
      );
    } finally {
      setLoading(false);
    }
  };

  // CALCULATE SUMMARY from transactions
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // ADD TRANSACTION
  const handleAddTransaction = async (transactionData) => {
    try {
      await addTransaction(transactionData);
      fetchTransactions(); // refresh the list
    } catch (err) {
      alert("Error adding transaction: " + err.message);
    }
  };

  // DELETE TRANSACTION
  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        fetchTransactions(); // refresh the list
      } catch (err) {
        alert("Error deleting transaction");
      }
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        {/* SUMMARY CARDS — show balance, income, expenses */}
        <SummaryCards
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <div className="main-grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            <AddTransaction onAdd={handleAddTransaction} />

            {loading && <p className="loading">Loading transactions...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
              <TransactionList
                transactions={transactions}
                onDelete={handleDeleteTransaction}
              />
            )}
          </div>

          {/* RIGHT COLUMN — charts */}
          <div className="right-column">
            {transactions.length > 0 ? (
              <>
                <PieChart transactions={transactions} />
                <BarChart transactions={transactions} />
              </>
            ) : (
              <div className="no-data">
                <p>Add some transactions to see your charts!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
