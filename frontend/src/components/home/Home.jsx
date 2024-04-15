import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import './Home.css';

// Functional component for the Home page
const Home = () => {
  return (
    // Container for the Home section
    <div className='home d-flex justify-content-center align-items-center'>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        {/* Heading */}
        <h1 className='text-center'>Organize your <br />Work and Life, finally</h1>
        {/* Subheading */}
        <p>Here is The Todo List App created by <b>Somil Kwatra</b></p>
        {/* Button to make a Todo List */}
        {/* Use Link component to navigate to the signup page */}
        <Link to="/signup" className='home-btn'>Make Todo List</Link>
      </div>
    </div>
  );
};

export default Home; // Export the Home component
