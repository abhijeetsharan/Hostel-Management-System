import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const { userData, backendURL, setUserData, setIsLoggedin } = useContext(AppContext)

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendURL + '/api/auth/send-verify-otp')

      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendURL + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')

    } catch (error) {
      toast.error(error.message)
    }
  }

  if(location.pathname === '/login'){
    return null;
  }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-3 sm:px-24 absolute top-0 shadow-md'>

      <div onClick={() => navigate('/')} className='flex items-center gap-4 cursor-pointer'>
        <img src={assets.logo} alt='' className='w-20 sm:w-10' />
        <h1 className='text-xl sm:text-xl font-medium'>BIRLA INSTITUTE OF TECHNOLOGY</h1>
      </div>

      {userData ?
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2
              hover:bg-gray-200 cursor-pointer'>Verify email</li>
              }

              <li onClick={() => navigate(('/profile'))} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Profile</li>
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            </ul>
          </div>
        </div>

        : <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      }

    </div>
  )
}

export default Navbar
