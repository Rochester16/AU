// src/pages/PurchaseHistory.js
import React, { useEffect, useState } from "react";
import API from "../../api.js";


export default function PurchaseHistory() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => loadLogs(), []);

  async function loadLogs() {
    try {
      const res = await API.get("/purchase-history");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load purchase history");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return React.createElement(
      "section",
      { className: "card panel" },
      React.createElement("h2", null, "Purchase History"),
      React.createElement("p", null, "Loading...")
    );
  }

  if (logs.length === 0) {
    return React.createElement(
      "section",
      { className: "card panel" },
      React.createElement("h2", null, "Purchase History"),
      React.createElement("p", null, "No purchases found.")
    );
  }

  return React.createElement(
    "section",
    { className: "card panel" },
    React.createElement("h2", null, "Purchase History"),

    React.createElement(
      "table",
      { className: "history-table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement("th", null, "User"),
          React.createElement("th", null, "Product"),
          React.createElement("th", null, "Quantity"),
          React.createElement("th", null, "Total"),
          React.createElement("th", null, "Date")
        )
      ),

      React.createElement(
        "tbody",
        null,
        logs.map((log) =>
          React.createElement(
            "tr",
            { key: log._id },
            React.createElement("td", null, log.user?.email || "Unknown"),
            React.createElement("td", null, log.product?.name || "—"),
            React.createElement("td", null, log.quantity || 1),
            React.createElement("td", null, `₱${log.total?.toFixed(2) || "0.00"}`),
            React.createElement("td", null, new Date(log.createdAt).toLocaleString())
          )
        )
      )
    )
  );
}
