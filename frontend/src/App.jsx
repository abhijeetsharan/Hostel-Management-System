import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
