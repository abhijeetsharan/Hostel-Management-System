import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const ProtectedRoute = () => {
    const {isLoggedin} = useContext(AppContext)

    if(!isLoggedin){
        return <Navigate to="/login"/>
    }
  return (
    <Outlet />
  )
}

export default ProtectedRoute
