import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  try {
    const { name, email, password, address, phone, pincode } = req.body;

    if (!name || !email || !password || !address || !phone || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this phone" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      pincode,
    });

    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is already hashed in DB
    let isMatch = false;
    if (user.password.startsWith("$2b$")) {
      // Properly hashed password → compare
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Old plain-text password → rehash it
      if (password === user.password) {
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Successfully Logged in",
      token,
      userId: user._id,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Placeholder exports for missing functions to resolve import errors
export const update = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const remove = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const users = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const single_user = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
