import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { backendURL} = useContext(AppContext)

  const [formData, setFormData] = useState({
    name: '',
    rollnumber: '',
    phone: '',
    address: '',
    dob: '',
    email: '',
    roomType: 'not selected',
    gender: 'not selected',
    program: 'not selected',
    department: 'not selected',
    course: '',
    admissionReceipt: null,
    feeReceipt: null,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Store the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('rollnumber', formData.rollnumber);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('dob', formData.dob);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('roomType', formData.roomType);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('program', formData.program);
    formDataToSend.append('department', formData.department);
    formDataToSend.append('course', formData.course);
    formDataToSend.append('admissionReceipt', formData.admissionReceipt);
    formDataToSend.append('feeReceipt', formData.feeReceipt);

    try {
      // Send form data to the backend
      const response = await axios.post(backendURL + '/api/user/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      if (response.data.success) {
        toast.success('Application submitted successfully');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Failed to submit application');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Hostel Application Form</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Name</label>
          <input
            type="text"
            name='name'
            placeholder='Full name'
            value={formData.name}
            onChange={handleInputChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Roll Number */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Roll Number</label>
          <input
            type="text"
            name='rollnumber'
            placeholder='Roll Number'
            value={formData.rollnumber}
            onChange={handleInputChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Email */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type="email"
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Phone */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
          <input
            type="text"
            name='phone'
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleInputChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="not selected">Not selected</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Room Preference</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="not selected">Not selected</option>
            <option value="single">Single Room</option>
            <option value="shared">Double Room</option>
          </select>
        </div>

        {/* Program */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Program</label>
          <select
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="not selected">Not selected</option>
            <option value="ug">Under Graduate</option>
            <option value="pg">Post Graduate</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="not selected">Not selected</option>
            <option value="architecture">Architecture and Planning</option>
            <option value="biotechnology">Bioengineering and Biotechnology</option>
            <option value="chemical engineering">Chemical Engineering</option>
            <option value="food engineering">Centre for Food Engineering and Technology</option>
            <option value="chemistry">Chemistry</option>
            <option value="civil engineering">Civil and ENV Engineering</option>
            <option value="computer science">Computer Science and Engineering</option>
            <option value="data science">Centre for Qualitative Analysis and Data Science</option>
            <option value="electrical and electronic engineering">Electrical and Electronic Engineering</option>
            <option value="electronics and communication engineering">Electronics and Communication Engineering</option>
            <option value="hotel management">Hotel Management and Catering Technology</option>
            <option value="humanities">Humanities and Social Sciences</option>
            <option value="management">Management</option>
            <option value="mathematics">Mathematics</option>
            <option value="mechanical engineering">Mechanical Engineering</option>
            <option value="pharmaceutical sciences and technology">Pharmaceutical Sciences and Technology</option>
            <option value="physics">Physics</option>
            <option value="production and industrial engineering">Production and Industrial Engineering</option>
            <option value="remote sensing">Remote Sensing</option>
            <option value="space engineering and rocketry">Space Engineering and Rocketry</option>
          </select>
        </div>

        {/* Course */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Current Course</label>
          <input
            type="text"
            name='course'
            placeholder='Current Course'
            value={formData.course}
            onChange={handleInputChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        <h1 className='text-2xl font-semibold mb-6'>Document Upload</h1>
        {/* Admission Receipt Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Admission Receipt</label>
          <input
            type="file"
            name="admissionReceipt"
            onChange={handleFileChange}
            accept='.pdf'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500' 
          />
        </div>

        {/* Fee Receipt Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fee Receipt</label>
          <input
            type="file"
            name="feeReceipt"
            onChange={handleFileChange}
            accept='.pdf'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500' 
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;