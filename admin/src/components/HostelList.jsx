import React, { useContext } from "react";
import { HostelContext } from "../context/HostelContext";
import { Building, Trash2, Users, DoorOpen } from "lucide-react";

const HostelList = () => {
    const { hostels, deleteHostel } = useContext(HostelContext);

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="flex items-center gap-2 mb-6">
                <Building className="w-7 h-7 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-800">Hostels</h1>
            </div>

            {hostels.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <DoorOpen className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No hostels available.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {hostels.map((hostel) => (
                        <div 
                            key={hostel._id} 
                            className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <h2 className="text-lg font-bold">{hostel.name} ({hostel.type})</h2>
                                </div>
                                <div className="space-y-1 text-gray-600">
                                    <p>Total Rooms: {hostel.totalRooms}</p>
                                    <p>Available Rooms: {hostel.availableRooms}</p>
                                </div>
                            </div>
                            <button
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                onClick={() => deleteHostel(hostel._id)}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HostelList;