import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { backendURL, setIsLoggedIn } = useContext(AppContext);

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendURL + '/api/admin/logout')
            data.success && setIsLoggedIn(false)
            localStorage.removeItem("token", data.token)
            toast.success('Logged out successfully')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    if(location.pathname === '/') return null

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-3 sm:px-24 absolute top-0 shadow-md'>

      <div className='flex items-center gap-4 cursor-pointer'>
        <img src={assets.logo} alt="" className='w-20 sm:w-10' />
        <h1 className='text-xl sm:text-xl font-medium'>BIRLA INSTITUTE OF TECHNOLOGY</h1>
      </div>

      <div>
        <button onClick={handleLogout} className='bg-blue-600 text-white text-sm px-6 py-2 rounded-full'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
