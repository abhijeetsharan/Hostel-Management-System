import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { backendURL, getUserData } = useContext(AppContext);
  const [userData, setUserData] = useState({
    name: '',
    rollNumber: '',
    phone: '',
    address: { line1: '', line2: '' },
    email: '',
    gender: '',
    dob: '',
    program: '',
    department: '',
    course: '',
    hostel: '',
    image: '',
    room: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const uneditableFields = ['name', 'email', 'hostel', 'room'];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        
        const response = await axios.get(`${backendURL}/api/user/profile/${userId}`, userData);
        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
        toast.error(`Failed to fetch user data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [backendURL]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (uneditableFields.includes(name)) return;

    // Handle nested fields (e.g., address.line1)
    const keys = name.split('.');
    if (keys.length > 1) {
      setUserData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`${backendURL}/api/user/update/${userId}`, userData);
      if (response.data.success) {
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render form input
  const renderFormInput = (label, name, type = 'text', options = null) => {
    const isUneditable = uneditableFields.includes(name);

    if (options) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <select
            name={name}
            value={userData[name]}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          name={name}
          value={name.includes('.') ? userData[name.split('.')[0]][name.split('.')[1]] : userData[name]}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            isUneditable ? 'bg-gray-100' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none ${
            !isUneditable && 'focus:ring-blue-500 focus:border-blue-500'
          }`}
          disabled={isUneditable}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

        {loading ? (
          <p>Loading...</p>
        ) : isEditing ? (
          // Edit Mode
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFormInput('Name', 'name')}
              {renderFormInput('Roll Number', 'rollNumber')}
              {renderFormInput('Phone', 'phone')}
              {renderFormInput('Email', 'email')}
              {renderFormInput('Gender', 'gender', 'text', [
                { value: 'Not Selected', label: 'Not Selected' },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ])}
              {renderFormInput('Date of Birth', 'dob', 'date')}
              {renderFormInput('Address Line 1', 'address.line1')}
              {renderFormInput('Address Line 2', 'address.line2')}
              {renderFormInput('Program', 'program')}
              {renderFormInput('Department', 'department')}
              {renderFormInput('Course', 'course')}
              {renderFormInput('Hostel', 'hostel')}
              {renderFormInput('Room', 'room')}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(userData).map(([key, value]) => {
                if (key === 'address' || key === 'image') return null;
                return (
                  <div key={key}>
                    <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                    <p className="text-lg font-medium text-gray-800">{value}</p>
                  </div>
                );
              })}
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData.address.line1}, {userData.address.line2}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;