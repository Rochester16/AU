import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/UserNavbar.css";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar bg-white dark:bg-neutral-800 shadow">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <img src="/jewelry/logo.png" className="logo me-2" />
            <span className="brand-name">AUREVRA JEWELRY</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title fw-bold d-flex align-items-center gap-2">
                <img src="/jewelry/logo.png" className="w-8" />
                AUREVRA JEWELRY
              </h5>
              <button className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav ms-auto align-items-center gap-4">

                {/* SEARCH */}
                <li className="nav-item w-100 w-md-50">
                  <input className="form-control" placeholder="Search products..." />
                </li>

                {/* PROFILE */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i className="fas fa-user-circle text-xl"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/account">My Account</Link></li>
                    <li><Link className="dropdown-item" to="/purchase">My Purchase</Link></li>
                    <li><Link className="dropdown-item" to="/">Logout</Link></li>
                  </ul>
                </li>

                {/* CART */}
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart text-xl"></i>
                    <span className="cart-count badge bg-danger position-absolute top-0 start-100 translate-middle">
                      0
                    </span>
                  </Link>
                </li>

                {/* LINKS */}
                <li><Link className={`nav-link ${isActive("/home") && "active"}`} to="/home">Home</Link></li>
                <li><Link className={`nav-link ${isActive("/shop") && "active"}`} to="/shop">Shop</Link></li>
                <li><Link className={`nav-link ${isActive("/wishlist") && "active"}`} to="/wishlist">Wishlist</Link></li>
                <li><Link className={`nav-link ${isActive("/about") && "active"}`} to="/about">About Us</Link></li>
                <li><Link className={`nav-link ${isActive("/contact") && "active"}`} to="/contact">Contact</Link></li>

              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
