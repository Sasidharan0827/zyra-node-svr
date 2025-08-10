import Cart from "../models/cart.js";

export const addCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const alreadyInCart = await Cart.findOne({ userId, productId });
    if (alreadyInCart) {
      return res.status(400).json({ msg: "Already in Cart" });
    }

    const newtoCart = new Cart({ userId, productId });
    console.log(newtoCart);
    await newtoCart.save();

    res.status(200).json({ msg: "Added to  Cart", newtoCart });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error in add to cart", error: err.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId }).populate(
      "productId"
    ); // optional: populate product details

    if (!cart || cart.length === 0) {
      return res
        .status(200)
        .json({ msg: "No Cart items found for this user." });
    }

    return res.status(200).json({ msg: "Cart Items", cart });
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    return res
      .status(500)
      .json({ msg: "Unable to Get the cart Items", error: error.message });
  }
};

export const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const deletedItem = await Cart.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    res.status(200).json({ msg: "Product Removed From Cart", deletedItem });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error while removing product", error: err.message });
  }
};
