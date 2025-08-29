import Product from "../models/product.js"; // Assuming you have a Product model
import cloudinary from "../cloudinary.js"; // Cloudinary configuration
import fs from "fs";
import product from "../models/product.js";

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
      istrending: req.body.istrending || false,
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

export const getproductdetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching product details",
      error: error.message,
    });
  }
};

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
    const trendingItem = new Product({
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
    const allTrendingItems = await Product.find();
    res.status(200).send(allTrendingItems);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching trending items", error: error.message });
  }
};

export const getTrendingItemDetails = async (req, res) => {
  try {
    const trendingItem = await Product.findById(req.params.id);
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
// Get all trending products
export const getTrendingProducts = async (req, res) => {
  try {
    // Find products where istrending is true
    const trendingProducts = await Product.find({ istrending: true });

    if (trendingProducts.length === 0) {
      return res.status(404).send({ message: "No trending products found" });
    }

    res.status(200).send(trendingProducts);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching trending products",
      error: error.message,
    });
  }
};
// Update product trending status
export const updateTrendingStatus = async (req, res) => {
  try {
    const { id } = req.params; // product ID from URL
    const { istrending } = req.body; // true/false from request body

    // Update the product
    const product = await Product.findByIdAndUpdate(
      id,
      { istrending },
      { new: true } // return updated product
    );

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Trending status updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating trending status",
      error: error.message,
    });
  }
};
