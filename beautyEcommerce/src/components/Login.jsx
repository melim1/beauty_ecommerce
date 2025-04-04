import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Liste des icônes beauté
const iconPaths = [
  "/icons/lipstick.png",
  "/icons/mascara.png",
  "/icons/mirror.png",
  "/icons/perfume.png",
  "/icons/creme.png",
  "/icons/makeup.png",
];

// Génère une liste d’icônes à position aléatoire
const generateRandomDecorations = (count) => {
  const decorations = [];
  for (let i = 0; i < count; i++) {
    const icon = iconPaths[Math.floor(Math.random() * iconPaths.length)];
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.floor(Math.random() * 40) + 30; // Taille + grande
    decorations.push({ icon, top, left, size });
  }
  return decorations;
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [decorations] = useState(generateRandomDecorations(25)); // Icônes flottantes
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

  // Ajout de l’animation CSS pour les icônes flottantes
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0%   { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-20px) rotate(10deg); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: "linear-gradient(135deg, #ffe0ec, #ffffff)",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", // Centrer le contenu verticalement
    }}>

      {/* Décorations flottantes */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "100%",
        zIndex: 0,
      }}>
        {decorations.map((item, index) => {
          const floatDuration = Math.random() * 5 + 5;
          const floatDelay = Math.random() * 3;
          return (
            <img
              key={index}
              src={item.icon}
              alt="icon"
              style={{
                position: "absolute",
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                opacity: 0.2,
                pointerEvents: "none",
                filter: "drop-shadow(0 0 5px rgba(0,0,0,0.1))",
                animation: `float ${floatDuration}s ease-in-out ${floatDelay}s infinite alternate`,
              }}
            />
          );
        })}
      </div>

      {/* Formulaire au centre */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "400px",
        padding: "2rem",
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        textAlign: "center",
         backgroundColor:"transparent"

      }}>
        <h2 style={{
          fontSize: "26px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          Sign In
        </h2>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem",  backgroundColor:"transparent" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <a href="#" style={{ color: "#444", textDecoration: "none", backgroundColor:"transparent"}}>Forgot your password?</a>
            <a href="/register" style={{ color: "#444", textDecoration: "none" , backgroundColor:"transparent" }}>Create an account</a>
          </div>

          <button type="submit" style={{
            padding: "12px 40px",
            background: "#ff69b4",
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
            borderRadius: "8px",
            marginTop: "1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "0.3s"
          }}>
            Sign In
          </button>
        </form>
      </div>

    </div>
  );
};

// Style des inputs
const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  background: "rgba(255,255,255,0.8)",
  outline: "none"
};

export default Login;
