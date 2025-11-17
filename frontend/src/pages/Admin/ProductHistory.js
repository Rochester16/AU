// src/pages/ProductHistory.js
import React, { useEffect, useState } from "react";
import API from "../../api.js";


export default function ProductHistory() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => loadLogs(), []);

  async function loadLogs() {
    try {
      const res = await API.get("/product-history");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load product history");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return React.createElement(
      "section",
      { className: "card panel" },
      React.createElement("h2", null, "Product History"),
      React.createElement("p", null, "Loading history...")
    );
  }

  if (logs.length === 0) {
    return React.createElement(
      "section",
      { className: "card panel" },
      React.createElement("h2", null, "Product History"),
      React.createElement("p", null, "No product history found.")
    );
  }

  return React.createElement(
    "section",
    { className: "card panel" },
    React.createElement("h2", null, "Product History"),

    // TABLE
    React.createElement(
      "table",
      { className: "history-table" },

      // HEAD
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement("th", null, "Admin"),
          React.createElement("th", null, "Product"),
          React.createElement("th", null, "Action"),
          React.createElement("th", null, "Description"),
          React.createElement("th", null, "Date")
        )
      ),

      // BODY
      React.createElement(
        "tbody",
        null,
        logs.map((log) =>
          React.createElement(
            "tr",
            { key: log._id },

            React.createElement("td", null, log.admin || log.adminId?.email || "Unknown"),
            React.createElement("td", null, log.productName || log.productId?.name || "—"),
            React.createElement("td", null, log.action || "—"),
            React.createElement("td", null, log.details || log.description || "—"),

            React.createElement(
              "td",
              null,
              new Date(log.createdAt || log.date).toLocaleString()
            )
          )
        )
      )
    )
  );
}
