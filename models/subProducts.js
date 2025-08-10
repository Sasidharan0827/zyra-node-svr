// models/product.js
import mongoose from "mongoose";

const subProductSchema = new mongoose.Schema({
  badge: { type: String }, // optional (e.g., "Hot", "New")
  image: { type: String, required: true }, // product image URL
  category: { type: String, required: true }, // "T-Shirts" (label)
  title: { type: String, required: true }, // "Cool Graphic T-Shirt"
  description: { type: String }, // optional description
  oldPrice: { type: String, required: true }, // price before discount
  newPrice: { type: String, required: true }, // current selling price
});

export default mongoose.model("subProduct", subProductSchema);
