import React from 'react';
import "../../styles/Footer.css";
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <>
      {/* Instagram Section */}
      <div className="instagram-container">
        <div className="instagram-content">
          <div className="text-section">
            <h3>
              FOLLOW US ON <br /> <span className="instagram-title">INSTAGRAM</span>
            </h3>
            <Link to="/instagram" className="see-more">SEE MORE</Link>

          </div>
          <div className="images-section">
            <img src="/images/img1.jpg" alt="Product 1" />
            <img src="/images/img2.jpg" alt="Product 2" />
            <img src="/images/img3.jpg" alt="Product 3" />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="newsletter">
          <p>
            Subscribe to our newsletter and get <strong>10% off</strong>
          </p>
          <div className="newsletter-inputs">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email address" />
            <button>→</button>
          </div>
        </div>

        <div className="footer-content">
          <nav>
            <a href="#">HOME</a>
            <a href="#">SHOP</a>
            <a href="#">ABOUT</a>
            <a href="#">CONTACT</a>
            <a href="#">STOCKISTS</a>
            <a href="#">SITE CREDIT</a>
            <a href="#">FOLLOW ALONG</a>
          </nav>

          <div className="footer-logo">
            <h1>
              Touché <span>Beauty</span>
            </h1>
          </div>
        </div>

        <div className="copyright">
          <p>Copyright Touché 2022 - By Envol Agency</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
