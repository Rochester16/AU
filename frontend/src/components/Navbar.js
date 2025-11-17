import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="admin-nav">
      <div className="admin-nav-left">
        <img src="/logo.png" className="admin-logo" alt="logo" />
        <span className="admin-brand">AUREVRA ADMIN</span>
      </div>

      <div className="admin-nav-right">
        {user ? (
          <>
            <Link to="/admin" className={`admin-link ${isActive("/admin") ? "active" : ""}`}>
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`admin-link ${isActive("/admin/products") ? "active" : ""}`}
            >
              Inventory
            </Link>
            <Link
              to="/admin/products/add"
              className={`admin-link ${isActive("/admin/products/add") ? "active" : ""}`}
            >
              Add Product
            </Link>
            <Link
              to="/admin/history"
              className={`admin-link ${isActive("/admin/history") ? "active" : ""}`}
            >
              History
            </Link>
            <button className="admin-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="admin-link">Login</Link>
            <Link to="/register" className="admin-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
