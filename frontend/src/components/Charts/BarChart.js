import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarChart({ transactions }) {
  // Group by month
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("en-IN", {
      month: "short",
      year: "2-digit",
    });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][t.type] += t.amount;
    return acc;
  }, {});

  const labels = Object.keys(monthlyData).slice(-6); // last 6 months
  const incomeData = labels.map((m) => monthlyData[m].income);
  const expenseData = labels.map((m) => monthlyData[m].expense);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderRadius: 6,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "₹" + value.toLocaleString("en-IN"),
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Monthly Overview</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
