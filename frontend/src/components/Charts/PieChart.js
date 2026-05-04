import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components (required)
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ transactions }) {
  // Get only expense transactions
  const expenses = transactions.filter((t) => t.type === "expense");

  // Group expenses by category and sum them
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  // Colors for each slice
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#C9CBCF",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const total = values.reduce((a, b) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return ` ₹${value.toLocaleString("en-IN")} (${percent}%)`;
          },
        },
      },
    },
  };

  if (labels.length === 0) {
    return (
      <div className="chart-container">
        <h3>Expenses by Category</h3>
        <p className="empty-state">No expense data yet</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>Expenses by Category</h3>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;
