import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const ProtectedRoute = () => {
    const {setIsLoggedin} = useContext(AppContext)

    if(!setIsLoggedin){
        return <Navigate to="/login"/>
    }
  return (
    <Outlet />
  )
}

export default ProtectedRoute
 