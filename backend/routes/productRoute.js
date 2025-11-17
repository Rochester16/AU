// routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js"; // adjust path

import { protect, adminOnly } from "../middleware/authMiddleware.js"; // below

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

// admin-only (add / update / delete)
router.post("/", protect, adminOnly, addProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
