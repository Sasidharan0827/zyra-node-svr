// routes/authRoutes.js
import express from "express";
import { admins, single_admin } from "../../controllers/adminController.js";
const router = express.Router();

// Test route
router.get("/admins", admins);
router.get("/admin/:id", single_admin);

export default router;
