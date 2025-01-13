import React, { useState } from 'react';
import banner from '../assets/banner.png';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{
        backgroundImage: `url(${banner})`,
        minHeight: '100vh',
        width: '100vw',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-[420px] p-8 rounded-lg border-2 border-white/30 backdrop-blur-md bg-transparent text-white shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

          <div className="relative mb-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-5 py-5 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </i>
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-5 py-5 bg-transparent border-2 border-white/20 rounded-full outline-none text-white placeholder-white text-lg"
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

          <div className="flex justify-between items-center mb-6 -mt-4 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-1 accent-white"
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forget Password
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-white text-gray-800 rounded-full font-semibold text-lg shadow hover:bg-gray-100 transition-colors"
          >
            Login
          </button>

          <div className="text-center mt-6 text-sm">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className='font-semibold hover:underline'>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;