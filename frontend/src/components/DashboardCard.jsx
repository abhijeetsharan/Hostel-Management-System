import React, { useState, useRef, useEffect } from 'react';
import { DoorOpen, FileText, HomeIcon, Mail, Phone, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = () => {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null); // Ref for the dropdown container

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle hover for dropdown
    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        // Delay closing the dropdown to allow hovering over the dropdown itself
        setTimeout(() => {
            setShowOptions(false);
        }, 300); // Adjust delay as needed
    };

    return (
        <div className='space-y-6 mt-40 sm:mt-20 px-20 py-2'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>

                {/* Home */}
                <div onClick={() => navigate('/dashboard')} className='bg-white rounded-lg shadow p-6 hover:bg-slate-300 cursor-pointer'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-2xl font-medium text-gray-600'>Dashboard</p>
                        </div>
                        <Users className='h-8 w-8 text-indigo-600' />
                    </div>
                </div>

                {/* Application Form */}
                <div
                    className='bg-white rounded-lg shadow p-6 relative cursor-pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={dropdownRef} // Attach ref to the parent container
                >
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-2xl font-medium text-gray-600'>Application Form</p>
                        </div>
                        <HomeIcon className='h-8 w-8 text-indigo-600' />
                    </div>

                    {/* Dropdown Menu */}
                    {showOptions && (
                        <div
                            className='absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-10'
                            onMouseEnter={handleMouseEnter} // Keep dropdown open when hovering over it
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                onClick={() => navigate('/application-form')}
                                className='p-4 hover:bg-slate-200 rounded-t-lg flex items-center space-x-2'
                            >
                                <FileText className='h-5 w-5 text-gray-600' />
                                <p className='text-lg font-medium text-gray-700'>Application Form</p>
                            </div>

                            <div
                                onClick={() => navigate('/vacate')}
                                className='p-4 hover:bg-slate-200 rounded-b-lg flex items-center space-x-2'
                            >
                                <DoorOpen className='h-5 w-5 text-gray-700' />
                                <p className='text-lg font-medium text-gray-700'>Vacate Form</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <div onClick={() => navigate('/notifications')} className='bg-white rounded-lg shadow p-6 hover:bg-slate-300 cursor-pointer'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-2xl font-medium text-gray-600'>Notifications</p>
                        </div>
                        <Mail className='h-8 w-8 text-indigo-600' />
                    </div>
                </div>

                {/* Contact Card */}
                <div onClick={() => navigate('/contact')} className='bg-white rounded-lg shadow p-6 hover:bg-slate-300 cursor-pointer'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-2xl font-medium text-gray-600'>Contact</p>
                        </div>
                        <Phone className='h-8 w-8 text-indigo-600' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardCard
