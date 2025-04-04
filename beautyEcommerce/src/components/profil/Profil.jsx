import React, { useState, useEffect } from 'react';
import "../../styles/Profil.css";
import { FiUser, FiPackage, FiHeart, FiMail, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: '',
    last_name: ''
  });
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };


  const [productData, setProductData] = useState({
    name: '',
    description: '',
    prix: '',
    stockeDis: '',
    category: '',
    estDis: false,
    image: null
  });

  const handleProductChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        type === 'file' ? files[0] :
          value
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    // DEBUG: Vérifiez le token dans la console
    const token = localStorage.getItem("access_token");
    console.log("Token actuel:", token);

    if (!token) {
      alert("Vous n'êtes pas connecté. Redirection...");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('prix', productData.prix);
      formData.append('stockeDis', productData.stockeDis);
      formData.append('category', productData.category);
      formData.append('estDis', productData.estDis);
      if (productData.image) {
        formData.append('image', productData.image);
      }

      // DEBUG: Affichez les données envoyées
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/shop_app/add_product/",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Produit ajouté avec succès !");
    } catch (error) {
      console.error("Erreur complète:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config.headers
      });

      if (error.response?.status === 401) {
        alert("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("access_token");
        navigate("/login");
      } else {
        alert("Erreur: " + (error.response?.data?.error || error.message));
      }
    }
  };






  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await axios.get("http://127.0.0.1:8000/api/profil/", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setUser(response.data);
          setFormData({
            email: response.data.email,
            username: response.data.username,
            first_name: response.data.first_name || '',
            last_name: response.data.last_name || ''
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <div className="profile-header">
          <img
            src="/images/img1.jpg"
            alt="Profile"
            className="profile-img"
          />
          <h2 className="profile-name">{user.username}</h2>
        </div>
        <ul className="profile-menu">
          <li className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>
            <FiUser className="icon" /> Personal Info
          </li>
          <li className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
            <FiPackage className="icon" /> Add Product
          </li>
          <li>
            <FiHeart className="icon" /> Wishlist
          </li>
          <li className="logout" onClick={handleLogout}>
            <FiLogOut className="icon" /> Log Out
          </li>
        </ul>
      </aside>

      <main className="profile-content">
        {activeTab === "orders" ? (
          <div>
            <h2>Ajouter un produit</h2>
            <form className="product-form" onSubmit={handleProductSubmit}>
              <div>
                <label htmlFor="product-title">Titre :</label>
                <input
                  type="text"
                  id="product-title"
                  name="name"
                  value={productData.name}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="product-description">Description :</label>
                <textarea
                  id="product-description"
                  name="description"
                  value={productData.description}
                  onChange={handleProductChange}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="product-price">Prix :</label>
                <input
                  type="number"
                  id="product-price"
                  name="prix"
                  value={productData.prix}
                  onChange={handleProductChange}
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="product-stock">Stock disponible :</label>
                <input
                  type="number"
                  id="product-stock"
                  name="stockeDis"
                  value={productData.stockeDis}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="product-image">Image :</label>
                <input
                  type="file"
                  id="product-image"
                  name="image"
                  onChange={handleProductChange}
                  accept="image/*"
                />
              </div>
              <div>
                <label htmlFor="product-category">Catégorie :</label>
                <select
                  id="product-category"
                  name="category"
                  value={productData.category}
                  onChange={handleProductChange}
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Teint">Teint</option>
                  <option value="Yeux">Yeux</option>
                  <option value="Levres">Lèvres</option>
                  <option value="Pinceaux">Pinceaux et Eponges</option>
                </select>
              </div>
              <div>
                <label htmlFor="dis">Disponibilité :</label>
                <input
                  type="checkbox"
                  id="dis"
                  name="estDis"
                  checked={productData.estDis}
                  onChange={handleProductChange}
                />
              </div>
              <div>
                <button type="submit">Ajouter le produit</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="titre">Personal Info</h1>
            <form className="personal-info-form" onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  name="first_name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.last_name}
                  name="last_name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="password-section">
                <a
                  href="#"
                  className="change-password"
                  onClick={(e) => {
                    e.preventDefault();
                    setPasswordChangeVisible(!isPasswordChangeVisible);
                  }}
                >
                  {isPasswordChangeVisible ? "Hide password change" : "Change password"}
                </a>
              </div>

              {isPasswordChangeVisible && (
                <div className="password-change-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      onChange={handlePasswordChange}
                      value={passwordData.oldPassword}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      onChange={handlePasswordChange}
                      value={passwordData.newPassword}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handlePasswordChange}
                      value={passwordData.confirmPassword}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="save-password-btn"
                    onClick={handlePasswordSubmit}
                  >
                    CHANGE PASSWORD
                  </button>
                </div>
              )}

            </form>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>
        )}
      </main>
    </div>
  );
};

export default Profil;