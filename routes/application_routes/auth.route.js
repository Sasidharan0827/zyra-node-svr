// routes/authRoutes.js
import express from "express";
import {
  login,
  register,
  update,
  remove,
  users,
  single_user,
} from "../../controllers/authController.js";
const router = express.Router();

// Test route
router.get("/users", users);
router.get("/user/:id", single_user);
router.post("/login", login);
router.post("/register", register);
router.patch("/update/:id", update);
router.delete("/delete/:id", remove);
export default router;
