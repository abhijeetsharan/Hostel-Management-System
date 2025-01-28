import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import DashboardCard from '../components/DashboardCard';

const VacateRoomForm = () => {
  const navigate = useNavigate();
  const { backendURL } = useContext(AppContext);

  const [formData, setFormData] = useState({
    rollNumber: '',
    reason: 'not selected',
    additionalDetails: '',
    vacateDate: '',
  });

  //Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendURL + '/api/user/vacate', formData);
      console.log(response);

      if (response.data.success) {
        toast.success('Vacate request submitted successfully');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Failed to submit vacate request');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='mt-20 px- sm:px-20'>
      <DashboardCard />
      <div className='max-w-2xl mx-auto p-6 mt-10 bg-white shadow-2xl rounded-lg'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Vacate Room Form</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Roll Number */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              placeholder='Roll Number'
              value={formData.rollnumber}
              onChange={handleInputChange}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Reason for vacating */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Reason for Vacating</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value="not selected">Not selected</option>
              <option value="internship">Internship</option>
              <option value="medical">Medical reasons</option>
              <option value="personal">Personal reasons</option>
            </select>
          </div>

          {/* Additional Details */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Additional Details</label>
            <textarea
              name="additionalDetails"
              placeholder='Provide additional details'
              value={formData.additionalDetails}
              onChange={handleInputChange}
              rows='4'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Vacate Date */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Vacate Date</label>
            <input
              type="date"
              name="vacateDate"
              value={formData.vacateDate}
              onChange={handleInputChange}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Submit Button */}
          <div>
            <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
              Submit Vacate Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VacateRoomForm
