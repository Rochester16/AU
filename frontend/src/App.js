import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header";

// USER PAGES
import LoginPage from "./pages/User/LoginPage";
import RegisterPage from "./pages/User/RegisterPage";
import HomePage from "./pages/User/HomePage"; 

// ADMIN PAGES
import AddProductPage from "./pages/Admin/AddProductPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import ProductHistory from "./pages/Admin/ProductHistory";
import ProductsPage from "./pages/Admin/ProductsPage";
import PurchaseHistory from "./pages/Admin/PurchaseHistory";
import UserCreatedHistory from "./pages/Admin/UserCreatedHistory";

function Layout() {
  const location = useLocation();

  // pages where navbar should NOT appear
  const hideHeaderRoutes = ["/", "/user/login", "/user/register"];

  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterPage />} />

        {/* HOMEPAGE ROUTE */}
        <Route path="/home" element={<HomePage />} />   {/* <-- ADDED */}

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/products/history" element={<ProductHistory />} />
        <Route path="/admin/products/new" element={<AddProductPage />} />
        <Route path="/admin/purchases" element={<PurchaseHistory />} />
        <Route path="/admin/users" element={<UserCreatedHistory />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
