import React, { useState } from 'react';
import "../../styles/Profil.css";
import { FiUser, FiPackage, FiHeart, FiMail, FiLogOut } from "react-icons/fi";

const Profil = () => {
  const [activeTab, setActiveTab] = useState("info"); 

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <div className="profile-header">
          <img
            src="/images/img1.jpg" // Remplace par ton image
            alt="Profile"
            className="profile-img"
          />
          <h2 className="profile-name">userName</h2>
        </div>
        <ul className="profile-menu">
          <li className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>
            <FiUser className="icon" /> Personal Info
          </li>
          <li className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
            <FiPackage className="icon" /> My Orders
          </li>
          <li>
            <FiHeart className="icon" /> Wishlist
          </li>
          
          <li className="logout">
            <FiLogOut className="icon" /> Log Out
          </li>
        </ul>
      </aside>

      <main className="profile-content">
        {activeTab === "orders" ? (
          <>
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
          </>
        ) : (
          <>
            <h1 className="titre">Personal Info</h1>
            <form className="personal-info-form">
              <div className="form-group">
                <label>Email address*</label>
                <input type="email" value="user@gmail.com" disabled />
              </div>
              <div className="form-group">
                <label>First Name*</label>
                <input type="text" value="user" disabled />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" value="+79602723384" disabled />
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input type="text" value="user" disabled />
              </div>
              <div className="form-group">
                <label>Password*</label>
                <input type="password" value="************" disabled />
                <a href="/" className="change-password">Change password</a>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="text" value="09.01.1997" disabled />
              </div>
              <button type="submit" className="save-changes-btn">SAVE CHANGES</button>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default Profil;
