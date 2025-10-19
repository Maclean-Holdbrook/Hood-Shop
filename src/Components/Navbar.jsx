import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHeart, FaBox, FaBars, FaTimes, FaTruck } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import "../Css/Navbar.css";
import logo from "../Images/logo.png.png";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const cartCount = getCartItemsCount();
  const wishlistCount = getWishlistCount();
  const [showMenu, setShowMenu] = useState(false);
  const navbarRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Only add listener when menu is open
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Hood Shop" className="navbar-logo-img" />
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="navbar-text-link" onClick={() => setShowMenu(false)}>
          Home
        </Link>
        <Link to="/about" className="navbar-text-link" onClick={() => setShowMenu(false)}>
          About
        </Link>
        <Link to="/track-order" className="navbar-text-link" onClick={() => setShowMenu(false)}>
          Track Order
        </Link>
        <Link to="/support" className="navbar-text-link" onClick={() => setShowMenu(false)}>
          Support
        </Link>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        {showMenu ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`navbar-links ${showMenu ? 'show' : ''}`}>
        <Link to="/" className="navbar-mobile-link" onClick={() => setShowMenu(false)}>
          Home
        </Link>

        <Link to="/about" className="navbar-mobile-link" onClick={() => setShowMenu(false)}>
          About
        </Link>

        <Link to="/track-order" className="navbar-mobile-link" onClick={() => setShowMenu(false)}>
          Track Order
        </Link>

        <Link to="/support" className="navbar-mobile-link" onClick={() => setShowMenu(false)}>
          Support
        </Link>

        <Link to="/wishlist" className="navbar-icon-link" onClick={() => setShowMenu(false)}>
          <FaHeart size={20} />
          {wishlistCount > 0 && (
            <span className="icon-badge">{wishlistCount}</span>
          )}
          <span className="icon-label">Wishlist</span>
        </Link>

        <Link to="/cart" className="navbar-icon-link" onClick={() => setShowMenu(false)}>
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="icon-badge">{cartCount}</span>
          )}
          <span className="icon-label">Cart</span>
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/orders" className="navbar-icon-link" onClick={() => setShowMenu(false)}>
              <FaBox size={20} />
              <span className="icon-label">Orders</span>
            </Link>

            <Link to="/profile" className="navbar-icon-link" onClick={() => setShowMenu(false)}>
              <FaUser size={20} />
              <span className="icon-label">Profile</span>
            </Link>

            <button onClick={handleLogout} className="navbar-button logout-btn">
              <FaSignOutAlt />
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/signin" className="navbar-link" onClick={() => setShowMenu(false)}>
            <button className="navbar-button">
              <FaUser />
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;