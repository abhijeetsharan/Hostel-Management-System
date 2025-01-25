import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { backendURL } = useContext(AppContext);
    const navigate = useNavigate();

    //Fetch notifications from backend
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(backendURL + '/api/user/notifications', {
                withCredentials: true,
            });

            if(response.data.success){
                setNotifications(response.data.notifications);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching notifications');
        }
    };

    // Fetch notifiations on component mount
    useEffect(() => {
        fetchNotifications();
    }, []);

  return (
    <div className='mt-20 p-6'>
      <h1 className='text-2xl font-bold mb-6'>Notifications</h1>

      {/* Notifictions */}
      <div className='space-y-4'>
        {notifications.length > 0 ? (
            notifications.map((notifications) => (
                <div
                    key={notifications._id}
                    className='p-4 bg-white rounded-lg shadow-md hover:shadow:lg transition-shadow'
                >
                    <h2 className='text-xl font-semibold'>{notifications.title}</h2>
                    <p className='text-gray-600 mt-2'>{notifications.message}</p>
                    <p className='text-sm text-gray-400 mt-2'>
                        {new Date(notifications.dateSent).toLocaleString()}
                    </p>
                </div>
            ))
        ) : (
            <p className='text-gray-500'>No notifications found.</p>
        )}
      </div>
    </div>
  )
}

export default Notifications
