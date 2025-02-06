import React, { useContext } from 'react';
import { HostelContext } from "../context/HostelContext";
import { Link } from "react-router-dom";
import { Building, DoorClosed, ChevronRight, DoorOpen } from "lucide-react";

const Stats = () => {
  const { hostels } = useContext(HostelContext);

  return (
    <div className='max-w-6xl mx-auto mt-20 px-4'>
      <div className="flex items-center gap-2 mb-6">
        <Building className="w-7 h-7 text-blue-500" />
        <h1 className='text-2xl font-bold text-gray-800'>Hostels Overview</h1>
      </div>

      {hostels.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <DoorOpen className="mx-auto w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600">No hostels found</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {hostels.map((hostel) => (
            <div 
              key={hostel._id} 
              className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200'
            >
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-blue-500" />
                <h2 className='text-lg font-bold text-gray-800'>
                  {hostel.name} 
                  <span className="ml-1 text-sm font-normal text-gray-500">
                    ({hostel.type})
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <DoorClosed className="w-4 h-4" />
                <p>Available Rooms: {hostel.avaiableRooms}</p>
              </div>

              <Link 
                to={`/hostel/${hostel._id}`}
                className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors gap-2 font-medium"
              >
                View Rooms
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stats;