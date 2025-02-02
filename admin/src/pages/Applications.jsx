import React, { useContext, useEffect, useState } from 'react';
import { Check, X, AlertCircle, ChevronRight, ClipboardList, UserCheck, UserX, Calendar, Home, FileMinus, LayoutDashboard } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Applications = () => {
  const { backendURL } = useContext(AppContext);
  const [applications, setApplications] = useState([]);
  const [vacateRequests, setVacateRequests] = useState([]);

  useEffect(() => {
    fetchApplications();
    fetchVacateRequests();
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

  const fetchVacateRequests = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/vacate-requests`, { withCredentials: true });
      if (data.success) {
        setVacateRequests(data.requests);
      }
    } catch (error) {
      toast.error("Failed to fetch vacate requests.");
    }
  };

  const handleApplicationStatusChange = async (id, status) => {
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
      toast.error("Failed to update application status.");
    }
  };

  const handleVacateRequestStatusChange = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this vacate request?`)) return;

    try {
      const { data } = await axios.put(
        `${backendURL}/api/admin/vacate-requests/${id}/status`,
        { status },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(`Vacate request ${status} successfully!`);
        setVacateRequests(vacateRequests.map(req => req._id === id ? { ...req, status } : req));
      }
    } catch (error) {
      toast.error("Failed to update vacate request status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-emerald-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const StatusBadge = ({ status }) => {
    const icons = {
      approved: <Check className="w-4 h-4" />,
      rejected: <X className="w-4 h-4" />,
      pending: <AlertCircle className="w-4 h-4" />
    };

    const colors = {
      approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      rejected: 'bg-red-50 text-red-700 border-red-100',
      pending: 'bg-gray-50 text-gray-700 border-gray-100'
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status] || colors.pending}`}>
        {icons[status]}
        <span className="capitalize">{status || 'Pending'}</span>
      </span>
    );
  };

  return (
    <div className="max-w-6xl mt-20 mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage student applications and vacate requests</p>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Student Applications</h2>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-lg">
            Total: {applications.length}
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-100">
            <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-500">No applications found</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{app.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {app.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApplicationStatusChange(app._id, "approved")}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                          >
                            <UserCheck className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleApplicationStatusChange(app._id, "rejected")}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                          >
                            <UserX className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Vacate Requests Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Vacate Room Requests</h2>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-lg">
            Total: {vacateRequests.length}
          </span>
        </div>

        {vacateRequests.length === 0 ? (
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-100">
            <FileMinus className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-500">No vacate requests found</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vacateRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{req.rollNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{req.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {req.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleVacateRequestStatusChange(req._id, "approved")}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                          >
                            <UserCheck className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleVacateRequestStatusChange(req._id, "rejected")}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                          >
                            <UserX className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;