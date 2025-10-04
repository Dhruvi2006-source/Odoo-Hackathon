import React, { useState } from "react";
import "./EmployeePage.css";
import CurrencyConverter from "./CurrencyConverter"; // adjust path if needed

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
            Logout
          </button>
        </header>

        <section className="content">
          {activeTab === "dashboard" && (
            <div>
              <h2>📊 Overview</h2>
              <p>Total Submitted: {expenses.length}</p>
              <p>
                Approved:{" "}
                {expenses.filter((e) => e.status === "Approved").length}
              </p>
              <p>
                Pending: {expenses.filter((e) => e.status === "Pending").length}
              </p>
              <p>
                Rejected:{" "}
                {expenses.filter((e) => e.status === "Rejected").length}
              </p>
              {/* Currency Converter */}
              <div style={{ marginTop: "30px" }}>
                <CurrencyConverter />
              </div>
            </div>
          )}

          {activeTab === "submit" && (
            <div>
              <h2>📝 Submit Expense</h2>
              <form onSubmit={handleSubmit} className="expense-form">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

                {/* Receipt Upload */}
                <label>Upload Receipt</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />

                <button type="submit" className="btn submit">
                  Submit
                </button>
              </form>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h2>📜 Expense History</h2>
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
                      <td>{e.description}</td>
                      <td>{e.date}</td>
                      <td>{e.status}</td>
                      <td>
                        {e.receipt && e.receipt !== "No file" ? (
                          <a
                            href="#"
                            onClick={() => alert(`Preview: ${e.receipt}`)}
                          >
                            📎 {e.receipt}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default EmployeePage;
