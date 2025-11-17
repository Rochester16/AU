// src/pages/Admin/ProductsPage.js
import React, { useEffect, useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";
import "../../components/Admin.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [search, category, page]);

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await API.get("/products", {
        params: { search, category, page, limit: 20 },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted!");
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  // PAGE UI
  return React.createElement(
    "section",
    { className: "card panel" },

    // HEADER
    React.createElement(
      "div",
      { className: "panel-header" },
      React.createElement("h2", null, "Product Inventory")
    ),

    // FILTERS
    React.createElement(
      "div",
      { className: "panel-body filter-row" },

      // SEARCH
      React.createElement("input", {
        className: "search-input",
        placeholder: "Search product name...",
        value: search,
        onChange: (e) => setSearch(e.target.value),
      }),

      // CATEGORY
      React.createElement("input", {
        className: "search-input",
        placeholder: "Filter by category...",
        value: category,
        onChange: (e) => setCategory(e.target.value),
      }),

      // ADD PRODUCT LINK
      React.createElement(
        Link,
        { to: "/admin/products/add", className: "btn-primary" },
        "+ Add Product"
      )
    ),

    // LIST / TABLE
    loading
      ? React.createElement("p", null, "Loading products...")
      : products.length === 0
      ? React.createElement("p", null, "No products found.")
      : React.createElement(
          "table",
          { className: "inventory-table" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement("th", null, "Image"),
              React.createElement("th", null, "Name"),
              React.createElement("th", null, "Category"),
              React.createElement("th", null, "Price"),
              React.createElement("th", null, "Stock"),
              React.createElement("th", null, "Created"),
              React.createElement("th", null, "Actions")
            )
          ),
          React.createElement(
            "tbody",
            null,
            products.map((p) =>
              React.createElement(
                "tr",
                { key: p._id },

                // PRODUCT IMAGE
                React.createElement(
                  "td",
                  null,
                  p.image
                    ? React.createElement("img", {
                        src: `http://localhost:5000/uploads/${p.image}`,
                        alt: p.name,
                        className: "thumb-img",
                      })
                    : "No Image"
                ),

                React.createElement("td", null, p.name),
                React.createElement("td", null, p.category || "-"),
                React.createElement(
                  "td",
                  null,
                  "₱" + p.price.toLocaleString("en-PH")
                ),
                React.createElement("td", null, p.stock),
                React.createElement(
                  "td",
                  null,
                  new Date(p.createdAt).toLocaleDateString()
                ),

                // ACTIONS
                React.createElement(
                  "td",
                  { className: "actions-col" },

                  // EDIT
                  React.createElement(
                    Link,
                    { to: `/admin/products/edit/${p._id}`, className: "btn-small" },
                    "Edit"
                  ),

                  // DELETE
                  React.createElement(
                    "button",
                    {
                      className: "btn-small btn-danger",
                      onClick: () => deleteProduct(p._id),
                    },
                    "Delete"
                  )
                )
              )
            )
          )
        ),

    // PAGINATION
    React.createElement(
      "div",
      { className: "pagination" },

      React.createElement(
        "button",
        { disabled: page <= 1, onClick: () => setPage((p) => p - 1) },
        "Prev"
      ),

      React.createElement(
        "span",
        null,
        `Page ${page} of ${totalPages}`
      ),

      React.createElement(
        "button",
        { disabled: page >= totalPages, onClick: () => setPage((p) => p + 1) },
        "Next"
      )
    )
  );
}
