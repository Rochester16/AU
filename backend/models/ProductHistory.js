const mongoose = require("mongoose");

const ProductHistorySchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  action: { type: String, enum: ["created", "updated", "deleted"], required: true },
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductHistory", ProductHistorySchema);
