import React, { useState } from "react";
import "./EmployeePage.css";
import CurrencyConverter from "./CurrencyConverter";
import { Link } from "react-router-dom";
const EmployeePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Demo data with receipt column
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "Travel",
      amount: 200,
      description: "Client visit",
      date: "2025-09-30",
      status: "Approved",
      receipt: "travel_receipt.jpg",
    },
    {
      id: 2,
      category: "Meals",
      amount: 50,
      description: "Lunch with client",
      date: "2025-10-01",
      status: "Pending",
      receipt: "lunch_bill.png",
    },
    {
      id: 3,
      category: "Supplies",
      amount: 120,
      description: "Office pens & paper",
      date: "2025-10-02",
      status: "Rejected",
      receipt: "stationery.pdf",
    },
  ]);

  const [form, setForm] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
    receipt: null,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, receipt: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      ...form,
      id: expenses.length + 1,
      status: "Pending",
      receipt: form.receipt ? form.receipt.name : "No file",
    };
    setExpenses([...expenses, newExpense]);
    setForm({
      category: "",
      amount: "",
      description: "",
      date: "",
      receipt: null,
    });
    alert("Expense submitted with receipt!");
  };

  // Calculate stats for dashboard
  const totalExpenses = expenses.length;
  const approvedExpenses = expenses.filter((e) => e.status === "Approved").length;
  const pendingExpenses = expenses.filter((e) => e.status === "Pending").length;
  const rejectedExpenses = expenses.filter((e) => e.status === "Rejected").length;

  return (
    <div className="employee-container">
      <aside className="sidebar">
        <h2>👤 Employee</h2>
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </li>
          <li
            className={activeTab === "submit" ? "active" : ""}
            onClick={() => setActiveTab("submit")}
          >
            📝 Submit Expense
          </li>
          <li
            className={activeTab === "history" ? "active" : ""}
            onClick={() => setActiveTab("history")}
          >
            📜 History
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>Employee Dashboard</h1>
          <button className="btn logout" onClick={() => alert("Logged out!")}>
            <Link to="/" className="link-text">
              Logout
            </Link>
          </button>
        </header>

        <section className="content">
          {activeTab === "dashboard" && (
            <div className="dashboard-content">
              <h2>📊 Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>{totalExpenses}</h3>
                  <p>Total Submitted</p>
                </div>
                <div className="stat-card">
                  <h3>{approvedExpenses}</h3>
                  <p>Approved</p>
                </div>
                <div className="stat-card">
                  <h3>{pendingExpenses}</h3>
                  <p>Pending</p>
                </div>
                <div className="stat-card">
                  <h3>{rejectedExpenses}</h3>
                  <p>Rejected</p>
                </div>
              </div>
              
              {/* Currency Converter */}
              <div className="converter-section">
                <CurrencyConverter />
              </div>
            </div>
          )}

          {activeTab === "submit" && (
            <div className="submit-content">
              <h2>📝 Submit Expense</h2>
              <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g., Travel, Meals, Supplies)"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    placeholder="Description of the expense"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Receipt Upload */}
                <div className="form-group">
                  <label className="file-label">Upload Receipt (Image or PDF)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="file-input"
                  />
                </div>

                <button type="submit" className="btn submit">
                  Submit Expense
                </button>
              </form>
            </div>
          )}

          {activeTab === "history" && (
            <div className="history-content">
              <h2>📜 Expense History</h2>
              {expenses.length === 0 ? (
                <div className="no-expenses">
                  <p>No expenses submitted yet.</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((e) => (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.category}</td>
                          <td>${e.amount}</td>
                          <td className="description-cell">{e.description}</td>
                          <td>{e.date}</td>
                          <td>
                            <span className={`status status-${e.status.toLowerCase()}`}>
                              {e.status}
                            </span>
                          </td>
                          <td>
                            {e.receipt && e.receipt !== "No file" ? (
                              <a
                                href="#"
                                onClick={() => alert(`Preview: ${e.receipt}`)}
                                className="receipt-link"
                              >
                                📎 {e.receipt}
                              </a>
                            ) : (
                              <span className="no-receipt">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default EmployeePage;