// routes/productRoutes.js
import express from "express";
import multer from "multer";
import {
  createProduct,
  getProductsByCategory,
} from "../../controllers/subProductContoller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/products", upload.single("image"), createProduct);
router.get("/products/category/:category", getProductsByCategory);
export default router;
