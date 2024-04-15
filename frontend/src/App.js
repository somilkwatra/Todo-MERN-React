import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar'; // Import the Navbar component from the correct path
import Home from './components/home/Home';
import Footer from './components/footer/footer';
import About from './components/about/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components from React Router DOM
import Signup from './signup/Signup';
import Signin from './signup/Signin';
import Todo from './components/todo/Todo';
import { useDispatch } from 'react-redux'; // Import the useDispatch hook
import { authActions } from './store'; // Import the authActions from the store

const App = () => {
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  useEffect(() => {
    // Effect hook to check if the user is logged in
    const id = sessionStorage.getItem("id"); // Retrieve the user ID from session storage
    if (id) {
      dispatch(authActions.login()); // Dispatch the login action if the user ID exists
    }
  }, [dispatch]); // Dependency array to ensure the effect runs only once

  return (
    <div>
      <Router>
        {/* Render the Navbar component */}
        <Navbar />
        <Routes>
          {/* Define routes for different components */}
          <Route exact path='/' element={<Home />} /> {/* Route for the Home component */}
          <Route path='/about' element={<About />} /> {/* Route for the About component */}
          <Route path='/todo' element={<Todo />} /> {/* Route for the Todo component */}
          <Route path='/signup' element={<Signup />} /> {/* Route for the Signup component */}
          <Route path='/signin' element={<Signin />} /> {/* Route for the Signin component */}
        </Routes>
      </Router>
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
};

export default App; // Export the App component
