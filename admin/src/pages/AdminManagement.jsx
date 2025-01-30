import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';
import { Trash2, UserPlus, Users } from 'lucide-react';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: '' });
  const { backendURL } = useContext(AppContext);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/admin/all-admins");
      setAdmins(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error(error);
      toast.error(`Error fetching admins: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(backendURL + `/api/admin/delete-admin/${id}`);
      setAdmins(admins.filter(admin => admin._id !== id));
      toast.success("Admin deleted successfully");
    } catch (error) {
      toast.error(`Error deleting admin: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendURL + "/api/admin/add-admin", newAdmin);
      toast.success("Admin added successfully!");
      setNewAdmin({ name: '', email: '', password: '', role: '' });
      fetchAdmins();
    } catch (error) {
      toast.error(`Error adding admin: ${error.message}`);
    }
  };

  return (
    <div className="p-6 mt-20 space-y-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Admin Management</h2>
      </div>

      {/* Admin List Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{admin.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium capitalize">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(admin._id)}
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

      {/* Add Admin Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <UserPlus className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Add New Admin</h3>
        </div>
        
        <form onSubmit={handleAddAdmin} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              value={newAdmin.name} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={newAdmin.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={newAdmin.password} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required 
            />
            <select 
              name="role" 
              value={newAdmin.role} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="warden">Hostel Warden</option>
              <option value="clerk">Hostel Clerk</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Admin</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminManagement;