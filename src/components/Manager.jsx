import React, { useState } from "react";
import "./Manager.css";
import CurrencyConverter from "./CurrencyConverter";
import { Link } from "react-router-dom";

const ManagerPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Demo data
  const teamExpenses = [
    {
      id: 201,
      employee: "Bob",
      category: "Travel",
      amount: 220,
      status: "Approved",
      date: "2025-10-01",
    },
    {
      id: 202,
      employee: "Charlie",
      category: "Meals",
      amount: 80,
      status: "Pending",
      date: "2025-10-02",
    },
    {
      id: 203,
      employee: "Eve",
      category: "Supplies",
      amount: 150,
      status: "Pending",
      date: "2025-10-03",
    },
  ];

  const pendingApprovals = teamExpenses.filter((e) => e.status === "Pending");

  return (
    <div className="manager-container">
      <aside className="sidebar">
        <h2>👨‍💼 Manager</h2>
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </li>
          <li
            className={activeTab === "team" ? "active" : ""}
            onClick={() => setActiveTab("team")}
          >
            👥 Team Expenses
          </li>
          <li
            className={activeTab === "approvals" ? "active" : ""}
            onClick={() => setActiveTab("approvals")}
          >
            ✅ Approvals
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>Manager Dashboard</h1>
          <button className="btn logout" onClick={() => alert("Logged out!")}>
            <Link to="/" className="link-text">
              Logout
            </Link>
          </button>
        </header>

        <section className="content">
          {activeTab === "dashboard" && (
            <div>
              <h2>📊 Overview</h2>
              <p>Total Team Expenses: {teamExpenses.length}</p>
              <p>Pending Approvals: {pendingApprovals.length}</p>
              {/* Currency Converter */}
              <div style={{ marginTop: "30px" }}>
                <CurrencyConverter />
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div>
              <h2>👥 Team Expenses</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {teamExpenses.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.employee}</td>
                      <td>{e.category}</td>
                      <td>${e.amount}</td>
                      <td>{e.status}</td>
                      <td>{e.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "approvals" && (
            <div>
              <h2>✅ Pending Approvals</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.employee}</td>
                      <td>${e.amount}</td>
                      <td>{e.date}</td>
                      <td>
                        <button
                          onClick={() => alert(`Approved ${e.id}`)}
                          className="btn approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => alert(`Rejected ${e.id}`)}
                          className="btn reject"
                        >
                          Reject
                        </button>
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

export default ManagerPage;
