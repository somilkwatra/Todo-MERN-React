const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const list = require("./routes/list");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());
// Middleware for CORS
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Somil:Somil123@cluster0.e5dlrmq.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after connecting to MongoDB
    app.listen(1000, () => {
      console.log("Server started on port 1000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Authentication middleware
app.use("/api/v1", (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      // Verify JWT token
      const decodedToken = jwt.verify(token, "Somil123@");
      // Set decoded user data in request object
      req.userData = { userId: decodedToken.userId };
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  next();
});

// Routes for authentication
app.use("/api/v1", authRouter);
// Routes for task management
app.use("/api/v2", list);

module.exports = app;
