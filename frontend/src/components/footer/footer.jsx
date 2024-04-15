import React from 'react'
import './footer.css'

// Functional component for the footer
const Footer = () => {
  return (
    // Container for the footer section
    <div className='container-fluid p-3 d-flex justify-content-center align-items-center footer'>
      {/* Heading */}
      <h4>Todo</h4>&nbsp;
      {/* Copyright information */}
      <p className='m-0'>&copy;SOMIL KWATRA</p>
    </div>
  )
}

export default Footer // Export the Footer component
