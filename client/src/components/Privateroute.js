import React from 'react'
import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
// import Login from './Login'
import { isLoggedIn } from '../auth/auth'
const Privateroute = () => {

    // const isLoggedIn = true
    return isLoggedIn() ? <>
        <Header />
        <Outlet />
    </> : <Navigate to={"/"} />
}

export default Privateroute