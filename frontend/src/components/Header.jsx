import React, { useContext } from 'react';
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {userData, isLoggedin } = useContext(AppContext)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (!isLoggedin) {
      navigate('/login')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center'>
      {/* Profile Image */}
      <div className='relative group mb-8'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300'></div>
        <div className='relative'>
          <img 
            src={assets.header_img} 
            alt="Header" 
            className='w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform duration-300'
          />
        </div>
      </div>

      {/* Greeting */}
      <div className='space-y-4 mb-12'>
        <h1 className='flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-gray-800'>
          Hey <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>{userData ? userData.name : 'Bitian'}!</span>
          <span className='animate-wave'>👋</span>
        </h1>
        <h2 className='text-4xl sm:text-6xl font-extrabold'>
          Welcome to
          <span className='block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'>BIT Mesra</span>
        </h2>
      </div>

      {/* Description */}
      <p className='max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed'>
        Experience excellence in education, vibrant campus life, and a community that nurtures future leaders in technology and innovation.
      </p>

      {/* CTA Button */}
      <button 
        onClick={handleGetStarted}
        className='group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
      >
        <span className='relative z-10 flex items-center gap-2'>
          {userData ? 'Go to Dashboard' : "Get Started"}
          <svg 
            className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300' 
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
          </svg>
        </span>
        <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
      </button>

      {/* Feature Pills */}
      <div className='mt-16 flex flex-wrap justify-center gap-4 text-sm font-medium'>
        <div className='px-6 py-2 bg-white bg-opacity-50 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer'>
          🎓 Academic Excellence
        </div>
        <div className='px-6 py-2 bg-white bg-opacity-50 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer'>
          🏢 Modern Facilities
        </div>
        <div className='px-6 py-2 bg-white bg-opacity-50 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer'>
          🌟 Campus Life
        </div>
      </div>
    </div>
  );
};

export default Header;