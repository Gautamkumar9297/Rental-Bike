import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log(res);

      if (res.data.token) {
        // ✅ Save token and role
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        alert("✅ Login successful!");

        // ✅ Navigate based on user role
        if (res.data.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/");
        }
      } else {
        alert(res.data.message || "❌ Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error during login!");
    }
  };

  return (
    <div className="auth-container">
      <h2>User Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p className="note">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>

      <hr className="divider" />

      <p className="note admin-note">
        Are you an administrator? <Link to="/admindashboard">Admin Portal</Link>
      </p>
    </div>
  );
}

export default Login;
