import express from "express";

import {
  addLike,
  getliked,
  deleteLike,
} from "../../controllers/likeController.js";

const router = express.Router();
router.get("/:userId", getliked);
router.post("/:userId/product/:productId", addLike);
router.delete("/product/:productId", deleteLike);

export default router;
