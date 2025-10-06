import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onRegisterClick }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8085/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ Invalid credentials!");
      }
    } catch {
      setMessage("⚠️ Server not reachable");
    }
  };

  return (
    <div className="login-container card">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="login-btn">Login</button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setFormData({ username: "", password: "" })}
        >
          Cancel
        </button>
        <p className="register-link">
          Don’t have an account?{" "}
          <span onClick={onRegisterClick}>Create Account</span>
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
