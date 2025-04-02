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

 
 



  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
  
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    if (!passwordData.oldPassword) {
      setError("Veuillez entrer votre mot de passe actuel.");
      return;
    }
  
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        "http://127.0.0.1:8000/api/profil/",
        { 
          old_password: passwordData.oldPassword,
          new_password: passwordData.newPassword 
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
  
      setSuccess("Mot de passe mis à jour avec succès !");
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordChangeVisible(false);
      setError("");
  
    } catch (error) {
      setError(error.response?.data?.old_password?.[0] || 
               error.response?.data?.new_password?.[0] || 
               error.response?.data?.error || 
               "Une erreur est survenue. Veuillez réessayer.");
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
            <h1 className="titre">My Orders</h1>
            <div className="orders">
              <table>
                <thead>
                  <tr>
                    <th>ORDER</th>
                    <th>ORDER DATE</th>
                    <th>ORDER COST</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>№352673</td>
                    <td>10.12.20</td>
                    <td>$124.96</td>
                    <td>
                      <button className="details-btn">ORDER DETAILS</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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