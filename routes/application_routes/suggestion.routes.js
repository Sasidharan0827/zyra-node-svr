import express from "express";
import multer from "multer";
import {
  createSuggestion,
  getSuggestions,
  getSuggestionDetails,
} from "../../controllers/suggestionController.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/create-suggestion", upload.single("image"), createSuggestion);
router.get("/list-suggestions", getSuggestions);
router.get("/suggestion-details/:id", getSuggestionDetails);

export default router;
