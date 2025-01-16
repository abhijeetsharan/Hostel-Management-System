import React, { useState } from 'react';
import banner from '../assets/banner.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      //Handle Succeessful login
      const data = response;
      console.log(data);
      
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 3000,
      })

      if(formData.rememberMe) {
        localStorage.setItem('authToken', data.token);
      } else {
        sessionStorage.setItem('authToken', data.token);
      }

      //Redirect user to Dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } catch (err) {
      // console.log('Login error:', err);
      const errorMsg = 
        err.response.data.error.message || 'Something went wrong. Please try gain.';
      setError(errorMsg);

      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
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
      <ToastContainer />
      <div className="w-[420px] p-8 rounded-lg border-2 border-white/30 backdrop-blur-md bg-transparent text-white shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
            disabled = {loading}
          >
            {loading ? 'Logging in...' : 'Login'}
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