import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    // Paths where the Navbar should not be displayed
    const excludedPaths = ['/login', '/register'];

    // If current path matches excluded paths, don't render the Navbar
    if (excludedPaths.includes(location.pathname)) {
        return null;
    }

  return (
    <div>
      <nav className="bg-white shadow-lg fixed w-full">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Hostel Management System</h1>
          <ul className="flex space-x-6 text-gray-700">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="#features" className="hover:text-primary">Features</a></li>
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
