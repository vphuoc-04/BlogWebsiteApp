import React from 'react'
import { AdminDashboard } from '../../core/admin/AdminDashboard'
import { UseFetchUser } from '../../hooks/useUser';
const Dashboard = () => {
    // User metrics
    const { user, timeMessage } = UseFetchUser(); 

    return (
        <AdminDashboard 
            // User metrics
            user = { user }
            timeMessage = { timeMessage }
        />
    )
}

export default Dashboard;