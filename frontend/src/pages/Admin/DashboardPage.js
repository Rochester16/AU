// src/pages/Dashboard.js
import React from "react";
import "../../components/Admin.css";

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return React.createElement(
    "section",
    { className: "card panel" },
    React.createElement(
      "div",
      { className: "panel-header" },
      React.createElement("h2", null, "Admin Dashboard")
    ),
    React.createElement(
      "div",
      { className: "panel-body" },
      React.createElement(
        "p",
        null,
        user ? `Welcome back, ${user.name}!` : "Welcome to the admin dashboard!"
      ),
      React.createElement(
        "div",
        { className: "dashboard-stats" },
        React.createElement("div", { className: "stat-box" }, "Products Management Ready"),
        React.createElement("div", { className: "stat-box" }, "User Creation Logs Available"),
        React.createElement("div", { className: "stat-box" }, "Purchase History Tracking")
      )
    )
  );
}
