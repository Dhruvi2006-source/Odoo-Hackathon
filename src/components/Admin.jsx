import React, { useState } from "react";
import "./Admin.css";
import CurrencyConverter from "./CurrencyConverter";


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Demo data
  const users = [
    { id: 1, name: "Alice", role: "Manager", email: "alice@company.com" },
    { id: 2, name: "Bob", role: "Employee", email: "bob@company.com" },
    { id: 3, name: "Charlie", role: "Employee", email: "charlie@company.com" },
  ];

  const expenses = [
    {
      id: 101,
      employee: "Alice",
      amount: 200,
      status: "Approved",
      date: "2025-10-01",
    },
    {
      id: 102,
      employee: "Bob",
      amount: 150,
      status: "Pending",
      date: "2025-10-02",
    },
    {
      id: 103,
      employee: "Charlie",
      amount: 300,
      status: "Rejected",
      date: "2025-10-03",
    },
  ];

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>🛠️ Admin</h2>
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            👥 Manage Users
          </li>
          <li
            className={activeTab === "roles" ? "active" : ""}
            onClick={() => setActiveTab("roles")}
          >
            🔑 Roles
          </li>
          <li
            className={activeTab === "approvals" ? "active" : ""}
            onClick={() => setActiveTab("approvals")}
          >
            ✅ Approvals
          </li>
          <li
            className={activeTab === "expenses" ? "active" : ""}
            onClick={() => setActiveTab("expenses")}
          >
            💰 Expenses
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>Admin Dashboard</h1>
          <button className="btn logout" onClick={() => alert("Logged out!")}>
            Logout
          </button>
        </header>

        <section className="content">
          {activeTab === "dashboard" && (
            <div>
              <h2>📊 Overview</h2>
              <ul>
                <li>Total Users: {users.length}</li>
                <li>Total Expenses: {expenses.length}</li>
                <li>
                  Approved:{" "}
                  {expenses.filter((e) => e.status === "Approved").length}
                </li>
                <li>
                  Pending:{" "}
                  {expenses.filter((e) => e.status === "Pending").length}
                </li>
              </ul>
              {/* Currency Converter */}
              <div style={{ marginTop: "30px" }}>
                <CurrencyConverter />
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2>👥 Manage Users</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.role}</td>
                      <td>{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "roles" && (
            <div>
              <h2>🔑 Roles & Permissions</h2>
              <ul>
                <li>
                  <b>Admin:</b> Manage users, rules, expenses
                </li>
                <li>
                  <b>Manager:</b> Approve/reject, view team expenses
                </li>
                <li>
                  <b>Employee:</b> Submit/view expenses
                </li>
              </ul>
            </div>
          )}

          {activeTab === "approvals" && (
            <div>
              <h2>✅ Approval Rules</h2>
              <p>Manager → Finance → Director</p>
              <p>60% OR CFO approval = Auto-Approved</p>
            </div>
          )}

          {activeTab === "expenses" && (
            <div>
              <h2>💰 Expenses</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.employee}</td>
                      <td>${e.amount}</td>
                      <td>{e.status}</td>
                      <td>{e.date}</td>
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

export default AdminPage;
