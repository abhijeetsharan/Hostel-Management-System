import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Inbox, Trash2, MessageCircle } from 'lucide-react';

const ContactForms = () => {
  const [messages, setMessages] = useState([]);
  const { backendURL } = useContext(AppContext);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/messages`);
      setMessages(data.data || []);
    } catch (error) {
      toast.error(`Error fetching messages: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${backendURL}/api/admin/delete/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
      toast.success("Message deleted successfully!");
    } catch (error) {
      toast.error(`Error deleting message: ${error.message}`);
    }
  };

  return (
    <div className="p-6 mt-20 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <MessageCircle className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Contact Messages</h2>
          <p className="text-sm text-gray-500 mt-1">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'} received
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <Inbox className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-500 text-lg">No messages available.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date Sent</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{msg.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate">
                        {msg.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {new Date(msg.dateSent).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="inline-flex items-center space-x-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForms;