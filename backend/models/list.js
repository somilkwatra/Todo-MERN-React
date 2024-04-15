const mongoose = require("mongoose");

// Define the schema for the 'List' collection
const listSchema = new mongoose.Schema(
  {
    // Title of the task
    title: {
      type: String, // Data type is string
      required: true, // Title is required
      trim: true, // Trim whitespace from title
    },
    // Body of the task
    body: {
      type: String, // Data type is string
      required: true, // Body is required
      trim: true, // Trim whitespace from body
    },
    // Reference to the user who created the task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
      ref: "User", // References the 'User' model
      required: true, // createdBy field is required
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model("List", listSchema);
