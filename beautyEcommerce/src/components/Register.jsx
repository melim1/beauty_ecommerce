import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.error || "Une erreur est survenue. Veuillez réessayer.");
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
        <h2 style={{ color: "#ff758c", fontWeight: "bold" }}>Inscription</h2>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        {success && <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            required
          />
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
            onMouseOver={(e) => e.target.style.backgroundColor = "#ff5e78"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#ff758c"}
          >
            S'inscrire
          </button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Vous avez déjà un compte ? <a href="/login" style={{ color: "#ff758c", fontWeight: "bold" }}>Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
