import express from "express";
import multer from "multer";
import {
  createTrendingItem,
  getTrendingItems,
  getTrendingItemDetails,
} from "../../controllers/trendingController.js"; // Adjusted import to match the new controller
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/create-trending-item",
  upload.single("image"),
  createTrendingItem
);
router.get("/list-trending-items", getTrendingItems);
router.get("/trending-item-details/:id", getTrendingItemDetails);

export default router;
