import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import ContactForms from './pages/ContactForms'
import PostNotifications from './pages/PostNotifications'
import AdminManagement from './pages/AdminManagement'
import Stats from './pages/Stats'
import Navbar from './components/Navbar';
import ManageHostels from './pages/ManageHostels'
import ProtectedRoute from "./utils/ProtectedRoute";
import RoomsPage from './pages/RoomsPage';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
        <Route path='applications' element={<ProtectedRoute> <Applications /> </ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><ContactForms /> </ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute> <PostNotifications /></ProtectedRoute>} />
        <Route path='/stats' element={<ProtectedRoute> <Stats /> </ProtectedRoute>} />
        <Route path='/admins' element={<ProtectedRoute> <AdminManagement /></ProtectedRoute>} />
        <Route path='/hostels' element={<ProtectedRoute> < ManageHostels/> </ProtectedRoute>} />
        <Route path='/hostel/:hostelId' element={<ProtectedRoute> <RoomsPage/> </ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
