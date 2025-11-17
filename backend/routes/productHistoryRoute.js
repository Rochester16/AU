const express = require("express");
const ProductHistory = require("../models/ProductHistory");
const router = express.Router();

// GET all product logs
router.get("/", async (req, res) => {
  const logs = await ProductHistory.find().populate("adminId productId");
  res.json(logs);
});

module.exports = router;
