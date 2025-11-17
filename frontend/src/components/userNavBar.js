import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/UserNavbar.css";

export default function UserNavbar() {
  const [cartCount, setCartCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // ✅ Load cart count from MongoDB cart collection
  useEffect(() => {
    if (!token) return;

    axios
      .get("/api/cart/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const items = res.data.items || [];
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(() => setCartCount(0));
  }, [location]); // refresh count when navigating

  // Dark Mode Load
  useEffect(() => {
    if (localStorage.getItem("darkMode") === "enabled") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDark = () => {
    if (!darkMode) {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="user-navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="Aurevra Logo" className="logo" />
          <span>AUREVRA JEWELRY</span>
        </Link>
      </div>

      <div className="nav-right">

        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
        <Link to="/shop" className={`nav-link ${isActive("/shop") ? "active" : ""}`}>Shop</Link>
        <Link to="/wishlist" className={`nav-link ${isActive("/wishlist") ? "active" : ""}`}>Wishlist</Link>
        <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>About</Link>

        {/* CART ICON */}
        <Link to="/cart" className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {/* PROFILE DROPDOWN */}
        {user ? (
          <div className="dropdown">
            <i className="fas fa-user-circle dropdown-toggle profile-icon" data-bs-toggle="dropdown"></i>

            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/account">My Account</Link></li>
              <li><Link className="dropdown-item" to="/purchases">My Purchase</Link></li>
              <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}

        {/* DARK MODE SWITCH */}
        <div className="dark-toggle" onClick={toggleDark}>
          <i className={darkMode ? "fas fa-moon" : "far fa-moon"}></i>
        </div>

      </div>
    </nav>
  );
}
