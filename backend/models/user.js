const mongoose = require("mongoose");

// Define the schema for the 'User' collection
const userSchema = new mongoose.Schema(
  {
    // Email of the user
    email: {
      type: String, // Data type is string
      required: true, // Email is required
      unique: true, // Email must be unique
      trim: true, // Trim whitespace from email
      lowercase: true, // Convert email to lowercase
    },
    // Username of the user
    username: {
      type: String, // Data type is string
      trim: true, // Trim whitespace from username
    },
    // Password of the user
    password: {
      type: String, // Data type is string
      required: true, // Password is required
      minlength: 6, // Minimum length of the password (adjust as per your requirements)
    },
    // Lists created by the user
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
        ref: "List", // References the 'List' model
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model("User", userSchema);
