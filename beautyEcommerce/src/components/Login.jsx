import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", height: "100vh",
      background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    }}>
      <div style={{
        width: "25rem", padding: "2rem", borderRadius: "10px", textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}>
        <h2 style={{ color: "#ff758c", fontWeight: "bold" }}>Connexion</h2>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            required
          />
          <button type="submit" style={{
            padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#ff758c",
            color: "white", fontWeight: "bold", cursor: "pointer", transition: "0.3s",
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#ff5a8a"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#ff758c"}
          >
            Se connecter
          </button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Vous n'avez pas de compte ? <a href="/register" style={{ color: "#ff758c", fontWeight: "bold" }}>Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
