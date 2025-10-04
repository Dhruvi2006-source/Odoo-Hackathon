import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">💰 Expense Manager</div>
        <nav>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#roles">Roles</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="btn login">
            <Link to="/signin" className="link-text">
              Log in
            </Link>
            </button>
          <button className="btn signup">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Expense Management</h1>
          <p>
            Simplify reimbursements with automated approval workflows, OCR for
            receipts, and multi-level role-based access.
          </p>
          <button className="btn primary">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Core Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            🔑 Authentication & User Management
          </div>
          <div className="feature-card">🧾 Expense Submission & Tracking</div>
          <div className="feature-card">✅ Multi-Level Approvals</div>
          <div className="feature-card">⚖️ Conditional Approval Rules</div>
          <div className="feature-card">📸 OCR for Receipts</div>
          <div className="feature-card">🌍 Currency Conversion</div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="roles">
        <h2>Roles & Permissions</h2>
        <div className="role-grid">
          <div className="role-card">
            <h3>👤 Employee</h3>
            <p>Submit expenses, view history, track approval status.</p>
          </div>
          <div className="role-card">
            <h3>👨‍💼 Manager</h3>
            <p>
              Approve/reject expenses, view team expenses, escalate requests.
            </p>
          </div>
          <div className="role-card">
            <h3>🛠️ Admin</h3>
            <p>Manage users, configure approval rules, override approvals.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="about">
        <p>© 2025 Expense Manager | Designed for Smart Businesses</p>
      </footer>
    </div>
  );
};

export default HomePage;
