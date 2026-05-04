import axios from "axios";

// The base URL of your backend server
const API_URL = "http://localhost:5000/api/transactions";

// Get all transactions
export const getTransactions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new transaction
export const addTransaction = async (transactionData) => {
  const response = await axios.post(API_URL, transactionData);
  return response.data;
};

// Delete a transaction
export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Update a transaction
export const updateTransaction = async (id, transactionData) => {
  const response = await axios.put(`${API_URL}/${id}`, transactionData);
  return response.data;
};

// Get financial summary
export const getSummary = async () => {
  const response = await axios.get(`${API_URL}/stats/summary`);
  return response.data;
};
