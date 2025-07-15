import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//get users
export async function users(req, res) {
  try {
    const allUsers = await User.find();
    res.status(201).json({ message: "Users", allUsers });
  } catch (err) {
    console.log(" Error on fetching users ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

//get single-user
export async function single_user(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ meassage: "Id is Required" });
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    res.status(201).json({ meassage: "User Found", user });
  } catch (err) {
    console.log(" Error on fetch user ", err);
    res.status(500).json({ message: "Server Error" });
  }
}
//login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

//register
export async function register(req, res) {
  try {
    const { name, email, password, address, phone, pincode } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    // Create and save new user (password is hashed in pre-save hook)
    const newUser = new User({
      name,
      email,
      address,
      phone,
      pincode,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token and user ID
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

//update
export async function update(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) return res.status(400).json({ message: "Id is required" });
    const updateUser = await User.findByIdAndUpdate(id, updates, {
      new: true, // return the updated document
      runValidators: true, // validate the update fields
    });
    if (!updateUser) return res.status(404).json({ message: "User Not Found" });
    res.status(200).json({ message: "User Updated", user: updateUser });
  } catch (err) {
    console.log("Update Error", err);
    res.status(500).json({ message: "Server Error" });
  }
}

//delete
export async function remove(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id  is required" });
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({
        message: "User not Found",
      });
    res.status(201).json({ message: "User Deleted Sucessfully" });
  } catch (err) {}
}
