import { Router } from "express";
import upload from "../../upload.js";
import {
  uploadImage,
  getImage,
  deleteImage,
  updateImage,
  getAllimages,
  deleteAll,
} from "../../controllers/cloudinaryController.js";

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/all-image", getAllimages);
router.get("/image/:public_id", getImage);
router.delete("/image-remove/:public_id", deleteImage);
router.delete("/image-remove-all", deleteAll);
router.put("/image-update/:public_id", updateImage);
export default router;
