import React, { useState } from "react";
import "./RegisterForm.css";
import logo from "../../assets/logoImage/PMCLOGO.webp";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Validate before sending to backend
  const validateForm = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(formData.firstname) || !nameRegex.test(formData.lastname)) {
      return "Firstname and Lastname should contain only letters.";
    }
    if (!emailRegex.test(formData.email)) {
      return "Invalid email format.";
    }
    if (!phoneRegex.test(formData.mobile)) {
      return "Mobile number must be 10 digits.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/userdata/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Registration successful!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const text = await response.text();
        setError(`❌ ${text || "Something went wrong. Try again."}`);
      }
    } catch (err) {
      setError("⚠️ Server not reachable. Please try again later.");
    }
  };

  return (
    <>
      <div className="logo">
        <img src={logo} alt="Logo preview" />
        <h2>Pune Municipal Corporation</h2>
      </div>
      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="registerbox"> <h2> Welcome!  </h2>
            <p className="subtitle">Sign up by entering the information below</p>
          </div>

          <div className="form-row">
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <label>Firstname *</label>
            </div>

            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              <label>Lastname *</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email *</label>
            </div>

            <div className="input-group">
              <FaPhone className="icon" />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <label>Mobile Number *</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password *</label>
            </div>

            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirm Password *</label>
            </div>
          </div>

          <button type="submit" className="signup-btn">
            Sign up
          </button>

          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}

          <p className="login-text">
            Already have an account? <span>Login here</span>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
