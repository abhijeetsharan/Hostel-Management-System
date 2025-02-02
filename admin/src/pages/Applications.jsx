import React, { useContext, useEffect, useState } from 'react';
import { Check, X, AlertCircle, ChevronRight, ClipboardList, UserCheck, UserX } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Applications = () => {
  const { backendURL } = useContext(AppContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/applications`, { withCredentials: true });
      
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      toast.error("Failed to fetch applications.");
    }
  };

  const handleStatusChange = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this application?`)) return;

    try {
      const { data } = await axios.put(
        `${backendURL}/api/admin/applications/${id}/status`,
        { status },
        { withCredentials: true }
      );
      

      if (data.success) {
        toast.success(`Application ${status} successfully!`);
        setApplications(applications.map(app => app._id === id ? { ...app, status } : app));
      }
    } catch (error) {
      toast.error(`Failed to update application status.`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-emerald-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mt-20 mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Student Applications</h1>
        </div>
        <p className="text-gray-500 flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          Manage student applications and allocate hostels
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-gray-500">No applications found</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Roll Number</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Room Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{app.email}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{app.rollnumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.roomType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1.5 ${getStatusColor(app.status)}`}>
                        {app.status === 'approved' && <Check className="w-4 h-4" />}
                        {app.status === 'rejected' && <X className="w-4 h-4" />}
                        {app.status === 'pending' && <AlertCircle className="w-4 h-4" />}
                        <span className="capitalize">{app.status || "Pending"}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {app.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusChange(app._id, "approved")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 transition-colors"
                          >
                            <UserCheck className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleStatusChange(app._id, "rejected")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                          >
                            <UserX className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
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

export default Applications;