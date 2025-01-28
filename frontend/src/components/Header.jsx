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
    <div className='flex flex-col items-center mt-20 px-4 py-4 text-center text-gray-800 border border-gray-300'>
      <img src={assets.header_img} alt="Header" className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Bitian'}!
        <img className='w-8 aspect-square' src={assets.hand_wave} alt="" />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to BIT Mesra</h2>

      <p className='mb-8 max-w-md'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quos natus totam error id ducimus.</p>

      <button 
        onClick={handleGetStarted} 
        className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>{userData ? 'Dashboard' : "Get Started"}</button>
    </div>
  );
};

export default Header;
