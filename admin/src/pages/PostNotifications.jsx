import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';


const PostNotifications = () => {
  const { backendURL } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendURL}/api/notifications/create`,
        {
          title,
          message,
          recipient: recipient.trim() || null, // If empty, send to all users
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Notification posted successfully!");
        setTitle('');
        setMessage('');
        setRecipient('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }
  return (
    <div className='mt-20 max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg'>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">📢 Post Notification</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter notification title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Message</label>
          <textarea
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter notification message..."
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Recipient Input (Optional) */}
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Recipient (Optional - User ID)</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter User ID (Leave blank for all users)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md text-lg font-semibold"
        >
          📩 Send Notification
        </button>
      </form>
    </div>
  )
}

export default PostNotifications
