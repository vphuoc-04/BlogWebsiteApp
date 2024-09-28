import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Sidebar from './Sidebar';

const Admin = () => {
    return (
        <div className = "Admin">
            <Sidebar />
            <div className = "Routes">
                <Routes>
                    <Route path = '/dashboard' element = { <Dashboard /> } />
                </Routes>
            </div>
        </div>
    )
}

export default Admin;