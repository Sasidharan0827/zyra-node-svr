import suggestions from "../models/suggestion.js";

import cloudinary from "../cloudinary.js"; // Cloudinary configuration
import fs from "fs";

// Create a new suggestion with an image
export const createSuggestion = async (req, res) => {
  try {
    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided." });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Remove the local file after upload

    // Create a new suggestion with the Cloudinary image URL
    const suggestion = new suggestions({
      badge: req.body.badge,
      image: result.secure_url, // Store the Cloudinary URL
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      oldPrice: req.body.oldPrice,
      newPrice: req.body.newPrice,
      link: req.body.link,
      likeLink: req.body.likeLink,
      cartLink: req.body.cartLink,
    });

    // Save the suggestion to the database
    await suggestion.save();
    res.status(201).send(suggestion);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error creating suggestion", error: error.message });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const allSuggestions = await suggestions.find();
    res.status(200).send(allSuggestions);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching suggestions", error: error.message });
  }
};

export const getSuggestionDetails = async (req, res) => {
  try {
    const suggestion = await suggestions.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).send({ message: "Suggestion not found" });
    }
    res.status(200).send(suggestion);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching suggestion details",
      error: error.message,
    });
  }
};
