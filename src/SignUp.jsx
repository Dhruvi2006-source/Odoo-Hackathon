import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./SignUp.css";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countriesError, setCountriesError] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadCountries() {
      setLoadingCountries(true);
      setCountriesError(null);
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,currencies"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = data
          .map((c) => ({
            name: c?.name?.common || "Unknown",
            currencies: c?.currencies || {},
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        if (!cancelled) setCountries(list);
      } catch (err) {
        if (!cancelled) setCountriesError(String(err));
      } finally {
        if (!cancelled) setLoadingCountries(false);
      }
    }
    loadCountries();
    return () => {
      cancelled = true;
    };
  }, []);

  function validate() {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Invalid email";

    if (!name) e.name = "Name is required";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Minimum 8 characters required";

    if (confirmPassword !== password)
      e.confirmPassword = "Passwords don't match";

    if (!country) e.country = "Please select a country";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700)); // simulate API
      setSuccessMessage("Signup successful!");
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setCountry("");
      setErrors({});
    } catch (err) {
      setErrors({ form: "Signup failed: " + err.message });
    } finally {
      setSubmitting(false);
    }
  }

  const fadeContainer = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, when: "beforeChildren" },
    },
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="signup-container"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="signup-title">Create Account</h2>
      <p className="signup-subtitle">
        Start your journey — it only takes a minute.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        className="signup-form"
        noValidate
        variants={fadeContainer}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {errors.form && (
            <motion.div
              className="error-box"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {errors.form}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email */}
        <motion.label className="form-group" variants={fadeItem}>
          <span className="form-label">Email</span>
          <input
            type="email"
            className={`form-input ${errors.email ? "input-error" : ""}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </motion.label>

        {/* Full Name */}
        <motion.label className="form-group" variants={fadeItem}>
          <span className="form-label">Full Name</span>
          <input
            type="text"
            className={`form-input ${errors.name ? "input-error" : ""}`}
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </motion.label>

        {/* Password */}
        <motion.label className="form-group" variants={fadeItem}>
          <span className="form-label">Password</span>
          <input
            type="password"
            className={`form-input ${errors.password ? "input-error" : ""}`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </motion.label>

        {/* Confirm Password */}
        <motion.label className="form-group" variants={fadeItem}>
          <span className="form-label">Confirm Password</span>
          <input
            type="password"
            className={`form-input ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </motion.label>

        {/* Country */}
        <motion.div className="form-group full-width" variants={fadeItem}>
          <label className="form-label">Country</label>
          {loadingCountries ? (
            <p className="loading-text">Loading countries...</p>
          ) : countriesError ? (
            <p className="error-text">
              Failed to load countries: {countriesError}
            </p>
          ) : (
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`form-select ${errors.country ? "input-error" : ""}`}
            >
              <option value="">-- Select country --</option>
              {countries.map((c) => {
                const currency = c.currencies
                  ? Object.keys(c.currencies)[0]
                  : null;
                return (
                  <option key={c.name} value={c.name}>
                    {c.name}
                    {currency ? ` — ${currency}` : ""}
                  </option>
                );
              })}
            </select>
          )}
          {errors.country && <p className="error-text">{errors.country}</p>}
        </motion.div>

        {/* Submit button */}
        <motion.div
          className="form-group full-width form-footer"
          variants={fadeItem}
        >
          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? "Submitting…" : "Create account"}
          </button>
          <p className="signin-text">
            Already have an account?{" "}
            <Link to="/signin" className="link-text">
              Sign in
            </Link>
            {/* <span className="signin-link">Sign in</span> */}
          </p>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              className="success-box"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.section>
  );
}
