import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getproductdetails,
} from "../../controllers/productsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Configure multer for file uploads

router.post("/create-products", upload.single("image"), createProduct);
router.get("/list-products", getProducts);
router.get("/product-details/:id", getproductdetails);

export default router;
