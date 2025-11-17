// src/pages/AddProduct.js
import React, { useState } from "react";
import API, { apiPost } from "../../api.js";


import { useNavigate } from "react-router-dom";
import "../../components/Admin.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({ price: "", stock: "" });

  // Text fields
  const handleText = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // PRICE
  const handlePrice = (e) => {
    const val = e.target.value;
    setForm((s) => ({ ...s, price: val }));

    setErrors((s) => ({
      ...s,
      price: /^[0-9]*\.?[0-9]*$/.test(val)
        ? ""
        : "Price must be numeric only",
    }));
  };

  // STOCK
  const handleStock = (e) => {
    const val = e.target.value;
    setForm((s) => ({ ...s, stock: val }));

    setErrors((s) => ({
      ...s,
      stock: /^\d*$/.test(val)
        ? ""
        : "Stock must be whole numbers only",
    }));
  };

  // Image upload
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Validate form
  const validate = () => {
    if (!form.name.trim()) return "Product name is required.";
    if (!form.price.trim() || isNaN(form.price)) return "Invalid price.";
    if (form.stock !== "" && isNaN(form.stock)) return "Invalid stock value.";
    return null;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validate();
    if (v) return alert(v);

    if (errors.price || errors.stock) {
      return alert("Fix errors before submitting.");
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", Number(form.price));
    fd.append("category", form.category);
    fd.append("stock", form.stock ? Number(form.stock) : 0);
    if (file) fd.append("image", file);

    try {
      setLoading(true);

      await apiPost("/products", fd); // <-- NEW standardized call

      alert("Product added!");

      // Reset everything
      setForm({ name: "", description: "", price: "", category: "", stock: "" });
      setFile(null);
      setPreview(null);

      navigate("/admin/products");

    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card panel">
      <div className="panel-header">
        <h2>Add Product</h2>
      </div>

      <form className="panel-body form-grid" onSubmit={handleSubmit}>
        
        {/* NAME */}
        <label>
          Product Name
          <input
            name="name"
            value={form.name}
            onChange={handleText}
            placeholder="Enter product name"
          />
        </label>

        {/* CATEGORY */}
        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleText}
            placeholder="Category"
          />
        </label>

        <div className="panel-subsection full">

          {/* PRICE */}
          <label>
            Price (₱)
            <input
              name="price"
              value={form.price}
              onChange={handlePrice}
              placeholder="Enter price"
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </label>

          {/* STOCK */}
          <label>
            Stock
            <input
              name="stock"
              value={form.stock}
              onChange={handleStock}
              placeholder="Stock quantity"
            />
            {errors.stock && <p className="error-text">{errors.stock}</p>}
          </label>
        </div>

        {/* DESCRIPTION */}
        <label className="full">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleText}
            placeholder="Short description"
          />
        </label>

        {/* IMAGE UPLOAD */}
        <label
          className="file-drop full"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="file-drop-inner">
            {preview ? (
              <div className="preview-wrapper">
                <img src={preview} className="preview-img" alt="preview" />
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  ✖
                </button>
              </div>
            ) : (
              <>
                <div className="camera-ico">📸</div>
                <div>Drag & drop or click to upload</div>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>
        </label>

        {/* BUTTONS */}
        <div className="form-actions full">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Add Product"}
          </button>

          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setForm({ name: "", description: "", price: "", category: "", stock: "" });
              setFile(null);
              setPreview(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
