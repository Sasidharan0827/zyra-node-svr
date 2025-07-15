import Admin from "../models/adminModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//get users
export async function admins(req, res) {
  try {
    const allAdmin = await Admin.find();
    res.status(201).json({ message: "Admin", allAdmin });
  } catch (err) {
    console.log(" Error on fetching allAdmins ", err);
    res.status(500).json({ message: "Server Error" });
  }
}
//get single-admin
export async function single_admin(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ meassage: "Id is Required" });
    const Admin = await Admin.findOne({ _id: id });
    if (!Admin) return res.status(404).json({ message: "Admin Not Found" });
    res.status(201).json({ meassage: "Admin Found", Admin });
  } catch (err) {
    console.log(" Error on fetch Admin ", err);
    res.status(500).json({ message: "Server Error" });
  }
}
