import React, { useState } from 'react';
import banner from '../assets/banner.png';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${banner})`,
        minHeight: '100vh',
        width: '100vw',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-[500px] p-8 rounded-lg border-2 border-white/30 backdrop-blur-md bg-transparent text-white shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center mb-8">Register</h1>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full px-5 py-4 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full px-5 py-4 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
              />
            </div>
          </div>

          {/* Roll Number */}
          <div className="relative mb-6">
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Roll Number"
              required
              className="w-full px-5 py-4 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
            />
            <i className="absolute right-5 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
            </i>
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-5 py-4 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
            />
            <i className="absolute right-5 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </i>
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-5 py-4 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
            />
            <i className="absolute right-5 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </i>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-6">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-5 py-4 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
            />
            <i className="absolute right-5 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </i>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-white text-gray-800 rounded-full font-semibold text-lg shadow hover:bg-gray-100 transition-colors"
          >
            Register
          </button>

          <div className="text-center mt-6 text-sm">
            <p>
              Already have an account?{' '}
              <Link to="/" className="font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;