// controllers/productController.js
import Product from "../models/product.js";
import cloudinary from "../cloudinary.js"; // Cloudinary configuration
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    console.log("Incoming Body:", req.body);
    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided." });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Remove the local file after upload

    const newProduct = new Product({
      badge: req.body.badge,
      image: result.secure_url, // Store the Cloudinary URL
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      oldPrice: req.body.oldPrice,
      newPrice: req.body.newPrice,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", Product: newProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
};
// GET /api/products/category/:category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });
    if (products == null) {
      res.status(200).json({ msg: "no products found in the catagory" });
    } // filter by category label
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching products by category",
      error: err.message,
    });
  }
};
