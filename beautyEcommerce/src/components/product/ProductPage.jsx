import "../../styles/styleProduct.css";
import React, { useEffect, useState,useLayoutEffect } from 'react';
import { FaShoppingCart, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api"
import Footer from "../UI/Footer";
const ProductPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate();
  const[product, setProduct] = useState({})
  const[similarProducts, setSimilarProducts] = useState([])
  const[loading, setLoading]= useState(false)
  useEffect(() => {
    setLoading(true);
    api.get(`product_detail/${slug}`)
      .then(res => {
        console.log(res.data);
        setProduct(res.data);
        setSimilarProducts(res.data.similar_products);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      });
  }, [slug]); // ← Ajout de slug dans le tableau de dépendances
  
  

  useEffect (function(){
    setLoading(true)
    api.get(`product_detail/${slug}`)
    .then(res => {
    console.log(res.data)
    setProduct(res.data)
    setSimilarProducts(res.data.similar_products)
    setLoading(false)
})
.catch(err => {
    console.log(err.message)
    setLoading(false)
})
}, [])
useEffect(() => {
  window.scrollTo(0, 0);
}, [slug]); // Dès que le slug change, on remonte la page


  const [quantity, setQuantity] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fonction pour gérer la quantité
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Fonction pour gérer les dropdowns
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Liste des couleurs des swatches (exemple)
  const colors = ["#EED3C6", "#D1AFA2", "#B78E80", "#A67566", "#8D5D4D"];

  const handleAddToCart = () => {
    //  Ajoute le produit au panier (stockage local pour l'instant)
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = [...cartItems, { ...product, quantity }];
    localStorage.setItem("cart", JSON.stringify(newCart));

    // Redirige vers la page panier
    navigate("/cart");
  };

  return (
    <div className="container">
      <div className="content">
        {/* Navbar */}
        <div className="navbar">
          <h1 className="logo">Touché Beauty</h1>
          <Link to="/cart" className="cart-icon">
                              <FaShoppingCart />
                          </Link>
        </div>

        {/* Product Section */}
        <div className="product-section">
          <div className="product-image">
            <img src={`http://127.0.0.1:8000${product.image}`} alt="Full Coverage Concealer" />
          </div>
          <div className="product-details">
            <h2>{product.name}</h2>
            <p className="product-size">{product.size}g</p>
            <p className="description">{product.description}</p>
            <p className="price">{`$${product.price}`}</p>

            {/* Color Swatches */}
            <div className="color-swatches">
              {colors.map((color, i) => (
                <div key={i} className="swatch" style={{ backgroundColor: color }}></div>
              ))}
            </div>

            {/* Sélecteur de quantité + Add to Cart + Ingredients */}
            <div className="product-actions">
              <div className="quantity-cart">
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(-1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>

                {/* Add to Cart */}
                <button className="add-to-cart"  onClick={handleAddToCart}>ADD TO CART</button>
              </div>

              {/* Sections Détails du produit */}
              <div className="product-details-sections">
                <div className="dropdown">
                  <div className="dropdown-header" onClick={() => toggleDropdown(0)}>
                    <span>INGREDIENTS</span>
                    {openDropdown === 0 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {openDropdown === 0 && (
                    <div className="dropdown-content">
                      <p>{product.ingredient}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="dividere"></hr>

        {/* More Products */}
        <div className="more-products">
  <h3>MORE OF Touché Beauty</h3>
  <div className="product-list">
    {similarProducts.length > 0 ? (
      similarProducts.slice(0, 4).map((product) => (
      <div key={product.id} className="product-cards">
        <Link to={`/products/${product.slug}`} className="product-link" >
        <img key={product.id} src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
        <h4>{product.name}</h4>
          <p>{product.price}€</p>
        </Link>
      </div>  
      ))
    ) : (
      <p>No similar products available.</p>
    )}
  </div>
</div>
        <hr className="dividere"></hr>

        <Footer />


      </div> {/* Fermeture correcte de la div .content */}
    </div>
  );
};

export default ProductPage;
