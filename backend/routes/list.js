const express = require("express");
const router = express.Router();
const List = require("../models/list");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Route to add a new task
router.post("/addTask", async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query parameters
    const { title, body } = req.body;

    // Create a new task with the provided title, body, and createdBy (userId)
    const newTask = await List.create({ title, body, createdBy: userId });

    // Send a success response with the newly created task
    res.status(201).json({ task: newTask });
  } catch (error) {
    console.error(error);
    // If an error occurs, send a server error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update a task by ID
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;

    // Find the existing task by ID and update its title and body
    await List.findByIdAndUpdate(req.params.id, { title, body });

    // Send a success response
    res.status(200).json({ message: "Task Updated" });
  } catch (error) {
    console.error(error);
    // If an error occurs, send a server error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to delete a task by ID
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    // Find the task by ID and delete it
    await List.findByIdAndDelete(req.params.id);

    // Send a success response
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    // If an error occurs, send a server error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get tasks associated with a specific user by user ID
router.get("/getTasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find tasks associated with the specified user ID
    const tasks = await List.find({ createdBy: userId });

    // If no tasks found for the user, send a 404 response
    if (!tasks || tasks.length === 0) {
      res.status(404).json({ message: "No tasks found for the user" });
    } else {
      // Send a success response with the tasks
      res.status(200).json({ tasks });
    }
  } catch (error) {
    console.error(error);
    // If an error occurs, send a server error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
