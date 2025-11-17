import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoute.js";
import historyRoutes from "./routes/historyRoutes.js";
import CartCrus from "./models/CartCrus.js";   // ❗ this is NOT a route — it's a model!!!

dotenv.config();
connectDB();

const app = express();

// Static folder
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/history", historyRoutes);

// ❗ YOU CANNOT DO THIS:
// app.use("/cart", CartCrus); 
// Because CartCrus is a Mongoose model, not an Express router.

// ❗ Correct cart route should be:
// import cartRoutes from "./routes/cartRoutes.js";
// app.use("/api/cart", cartRoutes);

// Home
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
