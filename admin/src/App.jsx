import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AllocateRooms from './pages/AllocateRooms'
import PostNotifications from './pages/PostNotifications'
import AdminManagement from './pages/AdminManagement'
import Stats from './pages/Stats'
import Navbar from './components/Navbar';
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
        <Route path='applications' element={<ProtectedRoute> <Applications /> </ProtectedRoute>} />
        <Route path='/allocate' element={<ProtectedRoute><AllocateRooms /> </ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute> <PostNotifications /></ProtectedRoute>} />
        <Route path='/stats' element={<ProtectedRoute> <Stats /> </ProtectedRoute>} />
        <Route path='/admins' element={<ProtectedRoute> <AdminManagement /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
