import { Router } from "express";
import auth from "./application_routes/auth.route.js";
import admin from "./application_routes/admin.route.js";
import cloudinaryRoutes from "./application_routes/cloudinary.routes.js";
import catagories from "./application_routes/catagories.routes.js";
import products from "./application_routes/produc.routes.js";
import like from "./application_routes/like.route.js";
import cart from "./application_routes/cart.route.js";
import subcatagory from "./application_routes/subproduct.routes.js";
import suggestionRoutes from "./application_routes/suggestion.routes.js"; // Import suggestion routes

const router = Router();
router.use("/", auth);
router.use("/", admin);
router.use("/cloudinary", cloudinaryRoutes);
router.use("/catagories", catagories);
router.use("/like", like);
router.use("/cart", cart);
router.use("/products", products);
router.use("/sub-catagory", subcatagory);
router.use("/suggestions", suggestionRoutes);

export default router;
