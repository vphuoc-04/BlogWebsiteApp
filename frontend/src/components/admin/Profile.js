import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AuthContext';
import { AdminProfile } from '../../core/admin/AdminProfile';
import { AdminData } from '../../data/AdminData';
import { UploadAdminAvatar } from '../../services/AdminService';

const Profile = () => {
    const { currentAdmin, setCurrentAdmin } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);
    const [avatarAction, setAvatarAction] = useState(null);
    const [avatarView, setAvatarView] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [boxEditAvatar, setBoxEditAvatar] = useState(null);
    const [editAvatar, setEditAvatar] = useState(null);
    const [crop, setCrop] = useState(null);

    // Admin avatar
    const HandleAvatarActionSelect = () => { setAvatarAction(Show => !Show); }
    const HandleAvatarView = () => { setAvatarView(true); setAvatarAction(false); }
    const HandleCloseAvatarView = () => { setAvatarView(false); }
    const HandleSetAvatar = (event) => { 
        setAvatarAction(false);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarFile(reader.result);
                setBoxEditAvatar(true);
                setEditAvatar(true);
            }
            reader.readAsDataURL(file);
        }
    };
    const HandleCloseAvatarSettingBox = () => { setBoxEditAvatar(false); }
    const OnCrop = (view) => { setCrop(view); };
    const HandleUploadAdminAvatar = async () => {
        if (!crop) return;
        const blob = await fetch(crop).then(response => response.blob());
        const file = new File([blob], "AdminAvatar.png", { type: 'image/png' });
        await UploadAdminAvatar(file, currentAdmin, setCurrentAdmin);
    }

    return (
        <AdminProfile 
            admin = { admin }
            avatarAction = { avatarAction }
            HandleAvatarActionSelect = { HandleAvatarActionSelect }
            avatarView = { avatarView }
            HandleAvatarView = { HandleAvatarView }
            HandleCloseAvatarView = { HandleCloseAvatarView }
            boxEditAvatar = { boxEditAvatar }
            HandleSetAvatar = { HandleSetAvatar }
            HandleCloseAvatarSettingBox = { HandleCloseAvatarSettingBox }
            editAvatar = { editAvatar } 
            avatarFile = { avatarFile }
            OnCrop = { OnCrop } 
            HandleUploadAdminAvatar = { HandleUploadAdminAvatar }
        />
    )
}

export default Profile;