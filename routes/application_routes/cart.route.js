import express from "express";

import {
  getCartItems,
  addCart,
  deleteCartItems,
} from "../../controllers/cartController.js";

const router = express.Router();
router.get("/:userId", getCartItems);
router.post("/:userId/product/:productId", addCart);
router.delete("/:userId/product/:productId", deleteCartItems);

export default router;
