import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
