// zyra.js
import express from "express"; //express
import dotenv from "dotenv"; //env files
import mongoose from "mongoose"; //db schema
import morgan from "morgan"; //logger
import routes from "./routes/api.routes.js"; // routes
import { swaggerUi, swaggerSpec } from "./swagger/swagger.js";
import cors from "cors";

import upload from "./upload.js";
import cloudinary from "./cloudinary.js";

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();
//looger
app.use(morgan("dev"));
// Middleware
app.use(express.json());
//  Add Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//CROS
const allowedOrigins = [
  // "https://zyra.in", // live frontend (Angular/React/Vue etc.)
  "http://localhost:4200",
  "https://zyra-shop.netlify.app", // optional: for local development
];

app.use(
  cors({
    origin: allowedOrigins,
    // credentials: true, // ✅ if you're sending cookies or tokens
  })
); // Routes
app.use("/zyra", routes);
//  Connect to MongoDB Atlas
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log(" MongoDB Atlas connected");
    //start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });
// console.log("CLOUDINARY_URL is:", process.env.CLOUDINARY_URL);
