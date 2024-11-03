import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Profile from './Profile';
import Sidebar from './Sidebar';
import CreatePost from './CreatePost';

const Admin = () => {
    return (
        <div className = "Admin">
            <Sidebar />
            <div className = "Routes">
                <Routes>
                    <Route path = '/dashboard' element = { <Dashboard /> } />
                    <Route path = '/profile' element = { <Profile /> } />
                    <Route path = '/create' element = { <CreatePost /> } />
                </Routes>
            </div>
        </div>
    )
}

export default Admin;