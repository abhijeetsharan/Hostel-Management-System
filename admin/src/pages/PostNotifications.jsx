import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { Bell, Trash2, Send, Users, Calendar, AlertCircle } from 'lucide-react';

const PostNotifications = () => {
  const { backendURL } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/notifications/view`, { withCredentials: true });
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      toast.error("Failed to load Notifications");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendURL}/api/notifications/create`,
        {
          title,
          message,
          recipient: recipient.trim() || null,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Notification posted successfully!");
        setTitle('');
        setMessage('');
        setRecipient('');
        fetchNotifications();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      const { data } = await axios.delete(`${backendURL}/api/notifications/delete/${id}`, { withCredentials: true });
      if (data.success) {
        toast.success("Notification deleted!");
        setNotifications(notifications.filter((notification) => notification._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 space-y-8">
      {/* Create Notification Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Notification</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter a clear, concise title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
              <textarea
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Type your notification message here..."
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Recipient ID (Optional)</span>
                </div>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Leave blank to send to all users"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Send Notification</span>
          </button>
        </form>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Recent Notifications</h2>
          </div>
          <span className="text-sm text-gray-500">
            {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
          </span>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications available</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <p className="text-gray-600">{notification.message}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(notification.dateSent).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(notification._id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostNotifications;