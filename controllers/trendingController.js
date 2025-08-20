import trending from "../models/trending.js";

import cloudinary from "../cloudinary.js"; // Cloudinary configuration
import fs from "fs";

// Create a new trending item with an image
export const createTrendingItem = async (req, res) => {
  try {
    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided." });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Remove the local file after upload

    // Create a new trending item with the Cloudinary image URL
    const trendingItem = new trending({
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

    // Save the trending item to the database
    await trendingItem.save();
    res.status(201).send(trendingItem);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error creating trending item", error: error.message });
  }
};

export const getTrendingItems = async (req, res) => {
  try {
    const allTrendingItems = await trending.find();
    res.status(200).send(allTrendingItems);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching trending items", error: error.message });
  }
};

export const getTrendingItemDetails = async (req, res) => {
  try {
    const trendingItem = await trending.findById(req.params.id);
    if (!trendingItem) {
      return res.status(404).send({ message: "Trending item not found" });
    }
    res.status(200).send(trendingItem);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching trending item details",
      error: error.message,
    });
  }
};
