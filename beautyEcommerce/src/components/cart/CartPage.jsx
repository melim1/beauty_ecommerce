import React, { useState, useEffect } from 'react';
import "../../styles/Cart.css";
import { useNavigate } from "react-router-dom";
import {FaUser, FaBars } from "react-icons/fa"; // Ajout des icônes
import { Link } from "react-router-dom";



const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const subtotal = calculateTotal(); // ✅ Maintenant c'est correct

   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
      const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
      };
      


  return (

    <div className="cart-container">

        {/* Barre de navigation */}
      <div className="cart-navbar">
        {/* Sidebar (Menu Latéral) */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <h3 className='menu-cart'>Menu</h3>
            <button className="close-btn" onClick={toggleSidebar}>X</button>
            <ul>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Produits</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            </div>

        <FaBars className="menu-icon" onClick={toggleSidebar} /> {/* Menu burger à gauche */}
        
        <div className="nav-icons">
          

          <Link to="/profil" className="profile-icon">
               <FaUser  />
          </Link>
         
        </div>
      </div>



      <h2 className="cart-title">Your Shopping Cart</h2>

      <div className="cart-content">
        {/* Liste des produits (gauche) */}
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src="images/img1.jpg"alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>${parseFloat(item.price).toFixed(2)}</p>

                  <div className="cart-item-quantity">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Carte de résumé (droite) */}
        <div className="cart-summary">
        <h3>Order Summary</h3>
        <hr className="cart-summary-divider" />
        
          <div className="summary-details">
            <p>Subtotal: <span>${subtotal}</span></p>
            <p className='shipping'>Shipping: <span>Calculated on checkout</span></p>
            <hr className="cart-summary-divider" />
            <p className="total">Total: <span>${subtotal}</span></p>
            <hr className="cart-summary-divider" />
          </div>
          
          <button className="checkout-button">CHECKOUT NOW</button>
          <button className="continue-shopping">CONTINUE SHOPPING</button>
        </div>
      
      </div>
    </div>
  );
};

export default CartPage;
