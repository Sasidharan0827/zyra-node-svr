import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  badge: { type: String },
  image: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  oldPrice: { type: String, required: true },
  newPrice: { type: String, required: true },
});

export default mongoose.model("Products", productSchema);
