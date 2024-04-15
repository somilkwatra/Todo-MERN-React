import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(""); // Use state to manage userId

  useEffect(() => {
    // Fetch userId from session storage on component mount
    const userIdFromStorage = sessionStorage.getItem("id");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []); // Run only once on component mount

  useEffect(() => {
    // Fetch tasks associated with the user when userId changes
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://todo-backend-pgz7.onrender.com/api/v2/getTasks/${userId}`
        );
        setTodos(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks. Either you are a new user  .");
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]); // Run fetchTasks whenever userId changes

  // Show the textarea when clicking on the input field
  const showTextarea = () => {
    document.getElementById("textarea").style.display = "block";
  };

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // Handle form submission to add a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://todo-backend-pgz7.onrender.com/api/v2/addTask?userId=${userId}`,
        { title: inputs.title, body: inputs.body }
      );

      setTodos([...todos, response.data.task]);
      setInputs({ title: "", body: "" });
      toast.success("Task Added Successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again later.");
    }
  };

  // Delete a task by its ID
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-backend-pgz7.onrender.com/api/v2/deleteTask/${id}`);

      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
      toast.success("Task Deleted Successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again later.");
    }
  };

  // Update a task with new data
  const updateTask = async (taskId, updatedTaskData) => {
    try {
      await axios.put(
        `https://todo-backend-pgz7.onrender.com/api/v2/updateTask/${taskId}`,
        updatedTaskData
      );

      const updatedTodos = todos.map((todo) => {
        if (todo._id === taskId) {
          return { ...todo, ...updatedTaskData };
        }
        return todo;
      });
      setTodos(updatedTodos);

      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again later.");
    }
  };

  return (
    <>
      {/* Todo section */}
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
          {/* Input fields for adding a new task */}
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={showTextarea}
              name="title"
              value={inputs.title}
              onChange={handleChange}
            />
            <textarea
              id="textarea"
              style={{ display: "none" }}
              placeholder="BODY"
              className="p-2 todo-inputs"
              name="body"
              value={inputs.body}
              onChange={handleChange}
            />
          </div>
          {/* Add button */}
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
        {/* Todo cards */}
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row justify-content-center">
              {todos.map((todo, index) => (
                <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                  <TodoCards
                    title={todo.title}
                    body={todo.body}
                    id={todo._id}
                    delid={deleteTask}
                    updateTask={updateTask}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Todo update section */}
      <div
        className="todo-update"
        id="todo-update"
        style={{ display: "none" }}
      >
        <div className="container update">
          {/* Add any additional components related to updating tasks here */}
        </div>
      </div>
    </>
  );
};

export default Todo;
