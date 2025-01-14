import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 sm:px-12 md:px-16">

        {/* --------- Footer Top Section --------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-10">

          {/* --------- Logo and Description --------- */}
          <div className="flex flex-col items-start gap-5">
            {/* <img className="w-40 mb-4" src={assets.logo} alt="Company Logo" /> */}
            <p className='font-bold text-2xl text-blue-800'>HOSTEL MANAGEMENT SYSTEM</p>
            <p className="text-gray-600 text-base leading-7">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, corrupti.
            </p>
          </div>

          {/* --------- Company Links --------- */}
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="hover:text-indigo-600 cursor-pointer transition-all">Home</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-all">About Us</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-all">Privacy Policy</li>
            </ul>
          </div>

          {/* --------- Contact Information --------- */}
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-5 text-gray-800">GET IN TOUCH</p>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="hover:text-indigo-600 cursor-pointer transition-all">+91-123-456-7890</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-all">care@bitmesra.com</li>
            </ul>
          </div>

        </div>

        {/* --------- Footer Bottom Section --------- */}
        <div className="border-t pt-6">
          <p className="text-center text-sm text-gray-500">
            Copyright 2025 @ bitmesra.ac.in - All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer