import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log(formData);
      await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Inscription réussie !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.error || "Une erreur est survenue.");
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
          Sign Up —
        </h2>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        {success && <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="last_name"
            placeholder="Name"
            value={formData.last_name}
            onChange={handleChange}
            style={{
              padding: "12px", border: "1px solid #000", fontSize: "16px",
              width: "100%", textAlign: "left"
            }}
            required
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            style={{
              padding: "12px", border: "1px solid #000", fontSize: "16px",
              width: "100%", textAlign: "left"
            }}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{
              padding: "12px", border: "1px solid #000", fontSize: "16px",
              width: "100%", textAlign: "left"
            }}
            required
          />
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
            <a href="/login" style={{ color: "#000", textDecoration: "none" }}>Login Here</a>
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
    Sign Up
</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
