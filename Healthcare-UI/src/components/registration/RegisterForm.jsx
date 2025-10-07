import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import logo from "../../assets/logoImage/logo.jpg";


function RegisterForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear old messages

    if (formData.password !== formData.confirmPassword) {
      setMessage("⚠️ Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/userdata/registeruserdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Handle plain text or JSON response
      const textResponse = await response.text();

      if (response.ok) {
        setMessage("✅ Registration successful!");
        setFormData({
          fullname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });

        // Keep message visible for 2 seconds before redirecting
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${textResponse || "Registration failed!"}`);
      }
    } catch (error) {
      setMessage("⚠️ Error connecting to server!");
    }
  };


  return (
    <div className="register-page">
      <div className="logo" >
        <img src={logo} alt="Logo preview" />
      </div>

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

          <button type="submit" className="register-btn">
            Register
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              setFormData({
                fullname: "",
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
              })
            }
          >
            Cancel
          </button>

          <div className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </div>

          {message && (
            <p
              className={`message ${message.includes("✅") ? "success" : message.includes("❌") ? "error" : ""
                }`}
            >
              {message}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
