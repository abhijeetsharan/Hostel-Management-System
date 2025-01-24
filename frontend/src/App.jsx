import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import ProtectedRoute from './components/protectedRoute';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />

        <Route element={<ProtectedRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/application-form' element={<ApplicationForm/>} />
      </Routes>
    </div>
  )
}

export default App
