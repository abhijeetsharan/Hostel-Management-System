import React from 'react'
import Cards from '../components/Cards'

const Dashboard = () => {
  return (
    <div className='min-h-screen items-center justify-center bg-[url("/bg_img.png")]'>
      <Cards />
      
      <div className='flex flex-col items-center justify-center mt-8'>
        <h1 className='text-2xl font-bold'>Dashboard Overview</h1>
        <p className='mt-2 text-gray-700'>Welcome back! Here's what's happening in your hostel.</p>
      </div>
    </div>
  )
}

export default Dashboard
