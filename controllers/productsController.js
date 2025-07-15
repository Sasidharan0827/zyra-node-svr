import Product from "../models/product.js"; // Assuming you have a Product model
import cloudinary from "../cloudinary.js"; // Cloudinary configuration
import fs from "fs";

// Create a new product with an image
export const createProduct = async (req, res) => {
  try {
    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided." });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Remove the local file after upload

    // Create a new product with the Cloudinary image URL
    const product = new Product({
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

    // Save the product to the database
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error creating product", error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching products", error: error.message });
  }
};
