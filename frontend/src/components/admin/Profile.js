import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AuthContext';
import { AdminProfile } from '../../core/admin/AdminProfile';
import { AdminData } from '../../data/AdminData';

const Profile = () => {
    const { currentAdmin } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);

    return (
        <AdminProfile 
            admin = { admin }
        />
    )
}

export default Profile;