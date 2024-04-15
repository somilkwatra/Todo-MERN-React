import React, { useState } from 'react';

const Update = ({ onClose, onUpdate, updatedTask }) => {
  // State variables to store the updated task title and body
  const [title, setTitle] = useState(updatedTask.title);
  const [body, setBody] = useState(updatedTask.body);

  // Event handler to update the title state
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Event handler to update the body state
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  // Function to handle the submission of the updated task
  const handleSubmit = () => {
    // Call the onUpdate function passed from the parent component
    onUpdate(updatedTask.id, { title, body });
    // Call the onClose function to close the update modal
    onClose();
  };

  return (
    <div className='update-overlay'>
      <div className='update-content p-5'>
        <h3>Update Your Task</h3>
        {/* Input field for updating the task title */}
        <input
          type="text"
          className='todo-inputs my-4 w-100 p-3'
          value={title}
          onChange={handleTitleChange}
        />
        {/* Textarea for updating the task body */}
        <textarea
          className='todos-inputs w-100 p-3'
          value={body}
          onChange={handleBodyChange}
        ></textarea>
        <div>
          {/* Button to submit the updated task */}
          <button className='btn btn-dark my-4' onClick={handleSubmit}>UPDATE</button>
          {/* Button to close the update modal */}
          <button className='btn btn-dark my-4 mx-3' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Update;
