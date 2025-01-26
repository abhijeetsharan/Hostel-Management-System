import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Contact = () => {
    const { backendURL } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(backendURL + '/api/user/contact', formData);
            if(response.data.success){
                toast.success('Message sent successfully');
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error(response.data.message || 'Failed to send message.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }
  return (
    <div className='mt-20 px- sm:px-20'>
      <h1 className='text-3xl font-bold text-center mb-8'>Contact Us</h1>

      {/* Contact Information */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font font-semibold mb-4'>Contact Information</h2>
            <p className='text-gray-600 mb-2'>
                <span className='font-medium'>Email:</span> hostelsupport@bitmesra.ac.in
            </p>
            <p className='text-gray-600 mb-2'>
                <span className='font-medium'>Phone:</span> +91 12345 67890
            </p>
            <p className='text-gray-600'>
                <span className='font-medium'>Address:</span> BIT Mesra, Ranchi, Jharkhand, India
            </p>
        </div>

        {/* Contact Form */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font font-semibold mb-4'>Send us a Message</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows='4'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                </div>

                <div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
