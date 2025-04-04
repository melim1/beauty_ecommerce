import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from './UI/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("access_token", response.data.access); // Pour JWT
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", height: "100vh",
     
    }}>
      <div style={{
        width: "30rem", textAlign: "center",
      }}>
        <h2 style={{
          fontSize: "24px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "1rem"
        }}>
          Sign In —
        </h2>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "12px", border: "1px solid #000", fontSize: "16px",
              width: "100%", textAlign: "left"
            }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              padding: "12px", border: "1px solid #000", fontSize: "16px",
              width: "100%", textAlign: "left"
            }}
            required
          />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <a href="#" style={{ color: "#000", textDecoration: "none" }}>Forgot your password?</a>
            <a href="/register" style={{ color: "#000", textDecoration: "none" }}>Create an account</a>
          </div>

          <button type="submit" style={{
    padding: "12px 40px", 
    backgroundColor: "#000", 
    color: "white",
    border: "none", 
    fontWeight: "bold", 
    cursor: "pointer", 
    fontSize: "14px",
    borderRadius: "4px",
    width: "auto",
    display: "block",
    margin: "0 auto"
}}>
    Sign In
</button>
        </form>
      </div>
    </div>
    
    
  );
};

export default Login;
