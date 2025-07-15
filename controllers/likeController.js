import Liked from "../models/liked.js";

export const addLike = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const alreadyLiked = await Liked.findOne({ userId, productId });
    if (alreadyLiked) {
      return res.status(400).json({ msg: "Already Liked" });
    }

    const newLike = new Liked({ userId, productId });
    await newLike.save();

    res.status(200).json({ msg: "Added to Liked", newLike });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error in add like", error: err.message });
  }
};

export const getliked = async (req, res) => {
  try {
    const liked = await Liked.find({ userId: req.params.userId }).populate(
      "productId"
    ); // optional: populate product details

    if (!liked || liked.length === 0) {
      return res
        .status(404)
        .json({ msg: "No liked items found for this user." });
    }

    return res.status(200).json({ msg: "Liked Items", liked });
  } catch (error) {
    console.error("Error fetching liked items:", error.message);
    return res
      .status(500)
      .json({ msg: "Unable to Get the Liked Items", error: error.message });
  }
};

export const deleteLike = async (res, req) => {
  try {
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Unable to Remove Like ", error: err.message });
  }
};
