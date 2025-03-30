import '../styles/styles.css'
import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import api from '../api';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";





function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [products, setProducts] = useState([])

    useEffect(function () {
        api.get("products")
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])


    const navigate = useNavigate();

    return (

        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <div className="menu-icon" onClick={toggleSidebar}>
                    ☰
                </div>
                <h1 className="logo">Touché Beauty</h1>
                <div className="cart-icon">
                    <FaShoppingCart />
                </div>
                {user ? <a href='/profile'>{user.username}</a>  : <div className="auth-buttons">
                    <button className="auth-button" onClick={() => navigate("/login")}>
                        Se connecter
                    </button>
                    <button className="auth-button" onClick={() => navigate("/register")}>
                        S'inscrire
                    </button>
                </div>}



            </header>
            <hr className="divider"></hr>
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Menu</h2>
                    <button className="close-btn" onClick={toggleSidebar}>
                        &times;
                    </button>
                </div>
                <ul className="sidebar-links">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/shop">Faire mes achats</a>
                    </li>
                    <li>
                        <a href="/about">À propos</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </aside>

            {/* Overlay pour masquer le contenu principal lorsque le sidebar est ouvert */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}


            {/* Banner */}
            <section className="banner">
                <div className="banner-content">
                    <h2>Reveal Yourself</h2>
                    <p>With our biggest shade range in cosmetic history</p>
                    <button>Find Your Match</button>
                </div>
                <div className="banner-images">
                    <img src="../public/images/baniere1.jpg" alt="Cosmetic Products" />
                    <img src="../public/images/baniere2.jpg" alt="Cosmetic Products" />
                </div>
            </section>
            <hr className="divider"></hr>

            {/* Most Wanted */}
            <section className="most-wanted">
                <h2 className="title">Touché</h2>
                <h3>MOST WANTED</h3>
                <div className="products">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <Link to={`products/${product.slug}`} className="product-link">
                                <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
            <hr className="divider"></hr>

            {/* Shop by Category */}
            <section className="shop-by-category">
                <h2>Shop by Category</h2>
                <div className="categories">
                    <div className="category" id="eyes">
                        <img src="../public/images/img2.jpg" alt="Cosmetic Products" />
                        <h3>Yeux</h3>
                    </div>
                    <div className="category" id="face">
                        <img src="../public/images/img1.jpg" alt="Cosmetic Products" />
                        <h3>Teint</h3>
                    </div>
                    <div className="category" id="lips">
                        <img src="../public/images/img3.jpg" alt="Cosmetic Products" />
                        <h3>Rouge à Lèvres</h3>
                    </div>
                </div>
            </section>
            <hr className="divider"></hr>

            {/* Footer */}
            <footer className="footer">
                {/* Section principale avec les colonnes */}
                <div className="footer-content">
                    {/* Colonne 1: À propos */}
                    <div className="footer-section">
                        <h3>À Propos</h3>
                        <ul>
                            <li><a href="/about">Notre histoire</a></li>
                            <li><a href="/mission">Notre mission</a></li>
                            <li><a href="/values">Nos valeurs</a></li>
                        </ul>
                    </div>

                    {/* Colonne 2: Assistance */}
                    <div className="footer-section">
                        <h3>Assistance</h3>
                        <ul>
                            <li><a href="/contact">Nous contacter</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/returns">Retours et remboursements</a></li>
                        </ul>
                    </div>

                    {/* Colonne 3: Réseaux sociaux */}
                    <div className="footer-section">
                        <h3>Suivez-nous</h3>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
                        </div>
                    </div>
                </div>

                {/* Section basse avec mentions légales */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Touche. Tous droits réservés.</p>
                    <p>
                        <a href="/privacy-policy">Politique de confidentialité</a> |
                        <a href="/terms-of-service">Conditions d'utilisation</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
    },
    buttonContainer: {
        marginTop: "20px",
    },
    button: {
        margin: "10px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007BFF",
        color: "white",
    },
};

export default NavBar