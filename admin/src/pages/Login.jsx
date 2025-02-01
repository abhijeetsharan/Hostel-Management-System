import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useState } from 'react';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const { backendURL, setIsLoggedIn, setUser } = useContext(AppContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Redirect to dashboard if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate('/dashboard')
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendURL + '/api/admin/login', { email, password })

            if (data.success) {
                localStorage.setItem("token", data.token)
                setIsLoggedIn(true)
                // setUser(data.user)
                toast.success('Logged in successfully')
                navigate('/dashboard')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-[url("/bg_img.png")] px-6 sm:px-0'>
            <img src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-16 cursor-pointer' />
            <div className='bg-white p-10 rounded-lg shadow-lg w-full sm:w-96 text-gray-800 text-sm'>

                <h2 className='text-3xl font-semibold text-gray-700 text-center mb-3'>Admin</h2>
                <p className='text-center text-sm mb-6'>Login as Admin</p>

                <form onSubmit={handleSubmit}>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#ececf0]'>
                        <img src={assets.mail_icon} alt="" />
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent outline-none' type='email' placeholder='Email' required
                        />
                    </div>

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#ececf0]'>
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent outline-none' type='password' placeholder='Password' required
                        />
                    </div>

                    <button className='w-full py-2.5 rounded-full bg-indigo-500 text-white font-medium cursor-pointer'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
