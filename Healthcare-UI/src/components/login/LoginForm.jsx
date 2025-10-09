import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import logo from "../../assets/logoImage/PMCLOGO.webp";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

 //function for navigation
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
          email: formData.email,
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
        <h2>Pune Municipal Corporation</h2>
      </div>
      <div className="login-container">
        <div className="welcomebox"> <h2> Welcome!  </h2>
          <p>Login By Entering the Information Below</p> </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2></h2>

          <div className="input-group">
             <FaEnvelope className="icon" />
            <input
              type="text"
              name="email"
              value={formData.email}
              
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <label>Email / Mobile :</label>
          </div>

          <div className="input-group">
           <FaLock className="icon" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <label>Password :</label>
          </div>


          <div className="forgetaction">I forgot password</div>

          <button type="submit" className="login-btn">Login</button>
          <p>OR</p>
          <p className="register-link">
            Don’t have an account? <span onClick={onRegisterClick}>Create Account</span>
          </p>
          {message && <p className="message">{message}</p>}

          {/* <button
            type="button"
            className="cancel-btn"
            onClick={() => setFormData({ username: "", password: "" })}
          >
            Cancel
          </button> */}

        </form>
      </div>
    </>
  );
}

export default LoginForm;
