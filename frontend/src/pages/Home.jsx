import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-0 left-0 w-full h-full bg-[url("/bg_img.png")] bg-cover bg-center opacity-5'></div>
      <div className='absolute top-20 -left-32 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob'></div>
      <div className='absolute top-40 -right-32 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000'></div>
      <div className='absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000'></div>
      
      {/* Main content */}
      <div className='relative z-10'>
        <Navbar />
        <Header />
      </div>
    </div>
  )
}

export default Home
