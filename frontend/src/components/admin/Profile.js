import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AuthContext';
import { AdminProfile } from '../../core/admin/AdminProfile';
import { AdminData, defaultAvatar } from '../../data/AdminData';
import { 
    UploadAdminAvatar,
    DeleteAdminAvatar 
} from '../../services/AdminService';

const Profile = () => {
    const { currentAdmin, setCurrentAdmin } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);
    const [avatarAction, setAvatarAction] = useState(null);
    const [avatarView, setAvatarView] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [boxEditAvatar, setBoxEditAvatar] = useState(null);
    const [editAvatar, setEditAvatar] = useState(null);
    const [crop, setCrop] = useState(null);
    const [avatarViewAction, setAvatarViewAction] = useState(null);
    const [warning, setWarning] = useState(null);

    useEffect(() => {
        setAdmin(currentAdmin);
    }, [currentAdmin])

    // Admin avatar
    const HandleAvatarActionSelect = () => { setAvatarAction(Show => !Show); }

    const HandleAvatarView = () => { setAvatarView(true); setAvatarAction(false); }
    const HandleCloseAvatarView = () => { setAvatarView(false); setAvatarViewAction(null); }

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
    const HandleAvatarViewAction = () => { setAvatarViewAction(Show => !Show); }
    const HandleDeleteAdminAvatar = () => {
        setWarning({
            message: 'Are you sure you want to delete your avatar?',
            action: async () => {
                await DeleteAdminAvatar(currentAdmin, setCurrentAdmin);
                setAdmin(prevAdmin => ({ ...prevAdmin,  avatar: defaultAvatar }))
                setCurrentAdmin(prevAdmin => ({ ...prevAdmin,  avatar: defaultAvatar }));
                localStorage.setItem("admin", JSON.stringify({ ...currentAdmin, avatar: defaultAvatar }));
                setAvatarView(null);
                setWarning(null);
                setAvatarViewAction(null);
            }
        })
    }

    // Waring box
    const HandleWarningConfirm = async () => { if(warning?.action) { await warning.action(); } };
    const HandleWarningCancel = () => { setWarning(null); };

    return (
        <AdminProfile 
            admin = { admin }

            // Waring box
            warning = { warning }
            HandleWarningConfirm = { HandleWarningConfirm }
            HandleWarningCancel = { HandleWarningCancel }

            // Avatar admin
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
            avatarViewAction = { avatarViewAction }
            HandleAvatarViewAction = { HandleAvatarViewAction }
            HandleDeleteAdminAvatar = { HandleDeleteAdminAvatar }
        />
    )
}

export default Profile;