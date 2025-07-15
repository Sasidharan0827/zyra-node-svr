import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  label: { type: String, required: true },
  icon: { type: String }, // Optional
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

export default mongoose.model("Category", categorySchema);
