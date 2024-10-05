import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AuthContext';
import { AdminProfile } from '../../core/admin/AdminProfile';
import { AdminData, defaultAvatar } from '../../data/AdminData';
import { UseUpdateCurrentAdmin } from '../../hooks/useAuth';
import { 
    UploadAdminAvatar,
    DeleteAdminAvatar, 
    EditAdminProfile
} from '../../services/AdminService';

const Profile = () => {
    const { currentAdmin, setCurrentAdmin } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);
    UseUpdateCurrentAdmin(setAdmin, currentAdmin);

    // Admin avatar
    const [avatarAction, setAvatarAction] = useState(null);
    const [avatarView, setAvatarView] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [boxEditAvatar, setBoxEditAvatar] = useState(null);
    const [editAvatar, setEditAvatar] = useState(null);
    const [crop, setCrop] = useState(null);
    const [avatarViewAction, setAvatarViewAction] = useState(null);
    const [warning, setWarning] = useState(null);

    // Admin edit profile
    const [editProfile, setEditProfile] = useState(null);
    const [newInput, setNewInput] = useState(admin);
    const [keepData, setKeepData] = useState(admin);
    const [focusedInput, setFocusedInput] = useState("");
    const IsDataChange = () => {
        return (
            admin.firstname !== newInput.firstname ||
            admin.lastname !== newInput.lastname ||
            admin.username !== newInput.username ||
            admin.bio !== newInput.bio 
        );
    };
    const HandleFocus = (inputName) => { setFocusedInput(inputName); };
    const HandleBlur = () => { setFocusedInput(""); };

    // Admin email setting
    const [emailSetting, setEmailSetting] = useState(null);


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
    const HandleCloseAvatarSettingBox = () => { 
        setWarning({
            message:  'Are you sure you want to close edit avatar box?',
            action: () => {
                setBoxEditAvatar(false);
                setWarning(false);
            }
        })
    }
    const OnCrop = (view) => { setCrop(view); };
    const HandleUploadAdminAvatar = async () => {
        if (!crop) return;
        const blob = await fetch(crop).then(response => response.blob());
        const file = new File([blob], "AdminAvatar.png", { type: 'image/png' });
        const avatarProfile = await UploadAdminAvatar(file, currentAdmin, setCurrentAdmin);

        if (avatarProfile) {
            setAdmin(prevAdmin => ({ ...prevAdmin, avatar: avatarProfile }));
            setCurrentAdmin(prevAdmin => ({ ...prevAdmin, avatar: avatarProfile }));
            setCrop(null);
            setAvatarFile(null);
            setEditAvatar(false);
        }
        setBoxEditAvatar(false);
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


    // Admin Edit profile
    const HandleEditProfileBox = () => { setEditProfile(true); setKeepData(newInput); }
    const HandleCloseEditProfileBox = () => { 
        if (IsDataChange()) {
            setWarning({
                message: 'Are you sure you want to close edit profile box?',
                action: () => { setEditProfile(false); setNewInput(keepData); setWarning(null); }
            }) 
        }
        else {
            setEditProfile(false); 
            setNewInput(keepData);
        }
    }
    const HandleEditProfileChange = (event) => { setNewInput( {...newInput, [event.target.name] : event.target.value }) }
    const HandleEditAdminProfile = async () => { 
        EditAdminProfile(newInput, currentAdmin); 
        setAdmin(prevAdmin => ({ ...prevAdmin, firstname: newInput.firstname, lastname: newInput.lastname, username: newInput.username, bio: newInput.bio }))
        setCurrentAdmin(prevAdmin => ({ ...prevAdmin, firstname: newInput.firstname, lastname: newInput.lastname, username: newInput.username, bio: newInput.bio }))
        setEditProfile(false);
    }


    // Admin email setting
    const HandleEmailSettingBox = () => { setEmailSetting(true); }
    const HandleCloseEmailSettingBox = () => { setEmailSetting(false); }


    
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

            // Edit profile
            editProfile = { editProfile }
            HandleEditProfileBox = { HandleEditProfileBox }
            HandleCloseEditProfileBox = { HandleCloseEditProfileBox }
            newInput = { newInput }
            IsDataChange = { IsDataChange }
            HandleEditProfileChange = { HandleEditProfileChange }
            focusedInput = { focusedInput }
            HandleFocus = { HandleFocus }
            HandleBlur =  { HandleBlur }
            HandleEditAdminProfile = { HandleEditAdminProfile }

            // Email setting
            emailSetting = { emailSetting }
            HandleEmailSettingBox = { HandleEmailSettingBox }
            HandleCloseEmailSettingBox = { HandleCloseEmailSettingBox }
        />
    )
}

export default Profile;