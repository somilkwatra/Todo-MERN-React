import React, { useState } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import Update from './Update'; // Import the Update component

const TodoCards = ({ title, body, id, delid, updateTask }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // State to track completion status

  const toggleUpdate = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted); // Toggle completion status
  };

  return (
    <div className={`p-3 todo-card d-flex flex-column justify-content-between ${isCompleted ? 'completed' : ''}`}>
      <div>
        {/* Title with conditional strike-through */}
        <h5 style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>{title}</h5>
        <p className='todo-card-p'>{body.substring(0, 77)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        {/* Completed button */}
        <button className='btn btn-link d-flex justify-content-center align-items-center card-icon-head px-2 py-1' onClick={toggleCompleted}>
          Completed
        </button>
        {/* Update button */}
        <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1' onClick={toggleUpdate}>
          <GrDocumentUpdate className='card-items' />Update
        </div>
        {/* Delete button */}
        <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger' onClick={() => { delid(id); }}>
          <MdOutlineDelete className='card-items del' />Delete
        </div>
      </div>
      {isUpdateOpen && <Update onClose={toggleUpdate} onUpdate={updateTask} updatedTask={{ id, title, body }} />}
    </div>
  );
}

export default TodoCards;
