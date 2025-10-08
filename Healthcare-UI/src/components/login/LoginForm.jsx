import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import logo from "../../assets/logoImage/PMCLOGO.webp";

function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 👇 Define this function for navigation
  const onRegisterClick = () => {
    navigate("/register"); // redirects to RegisterForm route
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(""); // clear old messages

  try {
    const response = await fetch("http://localhost:8082/userdata/logindetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const textResponse = await response.text();

    if (response.ok) {
      setMessage("✅ Login successful!");
      // redirect after short delay
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setMessage(`❌ ${textResponse || "Invalid username or password!"}`);
    }
  } catch (error) {
    setMessage("⚠️ Server not reachable. Please try again later.");
  }
};


  return (
    <>
      <div className="logo">
       <img src={logo} alt="Logo preview" />
      </div>
      <div className="login-container">
        <div className="welcomebox"> Welcome! <br />  
          <p>Login By Entering the Information Below</p> </div>

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

          {/* <button
            type="button"
            className="cancel-btn"
            onClick={() => setFormData({ username: "", password: "" })}
          >
            Cancel
          </button> */}
  <p>OR</p>
          <p className="register-link">
            Don’t have an account?{" "}
            <span onClick={onRegisterClick}>Create Account</span>
          </p>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default LoginForm;
