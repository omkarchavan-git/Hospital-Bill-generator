import React, { useState } from "react";
import "./Registration.css";
import logo from "../assets/logo.png"; // keep your logo image in src/assets/

function Registration() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("⚠️ Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Registration successful!");
        setFormData({
          fullname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const errorText = await response.text();
        setMessage(`❌ Failed: ${errorText}`);
      }
    } catch (error) {
      setMessage("⚠️ Error connecting to server!");
    }
  };

  return (
    <div className="register-page">
      <img src={logo} alt="Logo" className="register-logo" />

      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Create Account</h2>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">Register</button>
          <button type="button" className="cancel-btn">Cancel</button>

          <div className="login-link">
            Already have an account? <span>Login</span>
          </div>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Registration;
