// // src/components/SignIn.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./SignIn.css";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     setMessage("Signing in...");

//     setTimeout(() => {
//       setMessage("Logged in successfully (mock)");
//     }, 1000);
//   };

//   const handleForgotPassword = () => {
//     if (!email) {
//       setMessage("Enter your email to receive a reset link.");
//       return;
//     }

//     // Simulate reset logic
//     setTimeout(() => {
//       setMessage("Password reset link sent to your email.");
//     }, 1000);
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSignIn}>
//         <h2>Welcome Back 👋</h2>
//         <p>Please sign in to your account</p>

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <div className="auth-links">
//           <button
//             type="button"
//             className="link-btn"
//             onClick={handleForgotPassword}
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <button type="submit" className="primary-btn">
//           Sign In
//         </button>

//         {message && <p className="auth-message">{message}</p>}

//         <p className="auth-bottom">
//           Don't have an account?{" "}
//           <Link to="/signup" className="link-text">
//             Sign Up
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignIn;


















// src/components/SignIn.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // For redirecting to other pages

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!role) {
      setMessage("Please select a role.");
      return;
    }

    setMessage("Signing in...");

    setTimeout(() => {
      setMessage("Logged in successfully (mock)");

      // Redirect based on role
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Manager") {
        navigate("/manager");
      } else if (role === "Employee") {
        navigate("/employeePage");
      }
    }, 1000);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setMessage("Enter your email to receive a reset link.");
      return;
    }

    // Simulate reset logic
    setTimeout(() => {
      setMessage("Password reset link sent to your email.");
    }, 1000);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignIn}>
        <h2>Welcome Back 👋</h2>
        <p>Please sign in to your account</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>

        <div className="auth-links">
          <button
            type="button"
            className="link-btn"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="primary-btn">
          Sign In
        </button>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-bottom">
          Don't have an account?{" "}
          <Link to="/signup" className="link-text">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
