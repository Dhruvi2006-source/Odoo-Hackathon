import React from "react";
import SignUp from "./SignUp";
import EmployeePage from "./components/EmployeePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import HomePage from "./components/HomePage";
import AdminPage from "./components/Admin";
import ManagerPage from "./components/Manager";

export default function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employeePage" element={<EmployeePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/manager" element={<ManagerPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}
