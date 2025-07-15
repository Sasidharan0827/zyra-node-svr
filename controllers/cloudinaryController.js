import cloudinary from "../cloudinary.js";
import fs from "fs";

// CREATE (Upload)
export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // remove local file
    res.json({
      message: "Image uploaded",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message || JSON.stringify(error),
    });
  }
};
//All Images
export const getAllimages = (req, res) => {
  cloudinary.api.resources(
    { type: "upload", prefix: "", max_results: 100 },
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error fetching images", error });
      }
      const urls = result.resources.map((img) => ({
        public_id: img.public_id,
        url: img.secure_url,
      }));
      res.json({ message: "All images", data: urls });
    }
  );
};
// READ (Get)
export const getImage = (req, res) => {
  const imageUrl = cloudinary.url(req.params.public_id, {
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  });
  res.json({ image_url: imageUrl });
};

// DELETE
export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params.public_id;
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: "Image deleted", public_id });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message || JSON.stringify(error),
    });
  }
};

// UPDATE (Delete old, upload new)
export const updateImage = async (req, res) => {
  try {
    const public_id = req.params.public_id;
    await cloudinary.uploader.destroy(public_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);
    res.json({
      message: "Image updated",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message || JSON.stringify(error),
    });
  }
};
//Delete All
export const deleteAll = async (req, res) => {
  cloudinary.api.delete_all_resources(
    { resource_type: "image" },
    (error, result) => {
      if (error) return res.status(500).json({ error });
      res.json({ message: "All Cloudinary images deleted", result });
    }
  );
};
