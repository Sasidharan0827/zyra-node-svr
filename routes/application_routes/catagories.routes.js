import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../../controllers/categoriesController.js"; // ✅ spelling fixed

const router = express.Router();

router.get("/menus", getAllCategories);
router.post("/create-menu", createCategory);
export default router;
