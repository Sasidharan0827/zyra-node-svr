import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getproductdetails,
  getTrendingProducts,
  updateTrendingStatus,
} from "../../controllers/productsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Configure multer for file uploads

router.post("/create-products", upload.single("image"), createProduct);
router.get("/list-products", getProducts);
router.get("/product-details/:id", getproductdetails);
router.get("/trending", getTrendingProducts);
router.put("/:id/trending", updateTrendingStatus);

export default router;
