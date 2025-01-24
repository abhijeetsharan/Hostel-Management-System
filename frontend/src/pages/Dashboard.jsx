import React, { useState } from 'react'
import { HomeIcon, Mail, Phone, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRooms: 0,
    totalMessages: 0,
  })

  return (
    <div className='space-y-6 mt-2 px-10 py-2'>
      <h1 className='text-3xl font-bold text-blue-800 flex items-center justify-center'>DASHBOARD</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        
        {/* Dashboard */}
        <div className='bg-white rounded-lg shadow p-6 hover:bg-slate-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-2xl font-medium text-gray-600'>Dashboard</p>
              {/* <p className='text-2xl font-semibold text-gray-900'>{stats.totalStudents}</p> */}
            </div>
            <Users className='h-8 w-8 text-indigo-600' />
          </div>
        </div>

        {/* Application Form */}
        <div onClick={()=> navigate('/application-form')} className='bg-white rounded-lg shadow p-6 hover:bg-slate-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-2xl font-medium text-gray-600'>Application Form</p>
              {/* <p className='text-2xl font-semibold text-gray-900'>{stats.totalRooms}</p> */}
            </div>
            <HomeIcon className='h-8 w-8 text-indigo-600' />
          </div>
        </div>

        {/* notifications */}
        <div className='bg-white rounded-lg shadow p-6 hover:bg-slate-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-2xl font-medium text-gray-600'>Notifications</p>
              {/* <p className='text-2xl font-semibold text-gray-900'>{stats.totalMessages}</p> */}
            </div>
            <Mail className='h-8 w-8 text-indigo-600' />
          </div>
        </div>

        {/* Rooms Card */}
        <div className='bg-white rounded-lg shadow p-6 hover:bg-slate-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-2xl font-medium text-gray-600'>Contact</p>
              {/* <p className='text-2xl font-semibold text-gray-900'>{stats.totalRooms}</p> */}
            </div>
            <Phone className='h-8 w-8 text-indigo-600' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
