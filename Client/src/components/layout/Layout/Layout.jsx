import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomedNavbar from '../Navbar/CustomedNavbar'
import Footer from '../Footer/Footer'
const Layout = () => {
    return (
        <div>
            <CustomedNavbar />
            <Outlet />
            <Footer />

        </div>
    )
}

export default Layout
