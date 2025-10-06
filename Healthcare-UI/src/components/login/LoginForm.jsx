import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 👇 Define this function for navigation
  const onRegisterClick = () => {
    navigate("/register"); // redirects to RegisterForm route
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    setMessage("Login successful!");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>

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
