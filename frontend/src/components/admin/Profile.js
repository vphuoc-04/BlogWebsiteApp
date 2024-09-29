import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AuthContext';
import { AdminProfile } from '../../core/admin/AdminProfile';
import { AdminData } from '../../data/AdminData';

const Profile = () => {
    const { currentAdmin } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);
    const [avatarAction, setAvatarAction] = useState(null);
    const [avatarView, setAvatarView] = useState(null);

    // Admin avatar
    const HandleAvatarActionSelect = () => { setAvatarAction(Show => !Show); }
    const HandleAvatarView = () => { setAvatarView(true); setAvatarAction(false); }
    const HandleCloseAvatarView = () => { setAvatarView(false); }

    return (
        <AdminProfile 
            admin = { admin }
            avatarAction = { avatarAction }
            HandleAvatarActionSelect = { HandleAvatarActionSelect }
            avatarView = { avatarView }
            HandleAvatarView = { HandleAvatarView }
            HandleCloseAvatarView = { HandleCloseAvatarView }
        />
    )
}

export default Profile;