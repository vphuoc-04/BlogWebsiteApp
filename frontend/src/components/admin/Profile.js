import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AuthContext';
import { AdminProfile } from '../../core/admin/AdminProfile';
import { AdminData, defaultAvatar } from '../../data/AdminData';
import { UseUpdateCurrentAdmin } from '../../hooks/useAuth';
import { 
    UploadAdminAvatar,
    DeleteAdminAvatar, 
    EditAdminProfile,
    EditPrimaryEmail,
    AddBackupEmail,
    DeleteBackupEmail,
    SetPrimaryBackupEmail,
    DeletePrimaryEmail,
    ChangePassword
} from '../../services/AdminService';

import { IsValidEmail } from '../../services/EmailService';

const Profile = () => {
    const { currentAdmin, setCurrentAdmin, AdminLogoutContext } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);
    const [newInput, setNewInput] = useState(admin);
    const [keepData, setKeepData] = useState(admin);

    UseUpdateCurrentAdmin(setAdmin, currentAdmin);

    // Error
    const [error, setError] = useState(null);

    // Success
    const [success, setSuccess] = useState(null);

    // Successfully 
    const [successfully, setSuccessfully] = useState(null);

    // Data change
    const HandleInputChange = (event) => { setNewInput( {...newInput, [event.target.name] : event.target.value }) }

    const IsDataChange = () => {
        return (
            admin.firstname !== newInput.firstname ||
            admin.lastname !== newInput.lastname ||
            admin.username !== newInput.username ||
            admin.bio !== newInput.bio ||
            admin.email !== newInput.email ||
            admin.editemail !== newInput.editemail ||
            admin.backupemail !== newInput.backupemail
        );
    };

    const IsEmailChange = () => { return IsValidEmail(newInput.editemail) && newInput.editemail !== admin.email && newInput.editemail !== admin.backupemail; }

    const IsBackupEmailValid = () => { return newInput.backupemail && newInput.backupemail !== newInput.email && IsValidEmail(newInput.backupemail); }

    const IsBackupEmailChange = () => { return newInput.backupemail && newInput.backupemail !== admin.backupemail }

    const IsPasswordChange = () => { 
        return(
            newInput.password !== "" && 
            newInput.newpassword !== "" && 
            newInput.renewpassword !== "" 
        ) 
    }


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
    const [focusedInput, setFocusedInput] = useState("");
    const HandleFocus = (inputName) => { setFocusedInput(inputName); };
    const HandleBlur = () => { setFocusedInput(""); };

    // Admin email setting
    const [emailSetting, setEmailSetting] = useState(null);
    const [editPrimaryEmail, setEditPrimaryEmail] = useState(null);
    const [isClicked, setIsClicked] = useState(null);
    const [verify, setVerify] = useState(null);
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [addBackupEmail, setAddBackupEmail] = useState(null);
    const [backupEmailAction, setBackupEmailAction] = useState(null);

    // Admin password setting
    const [passwordSetting, setPasswordSetting] = useState(null);
    const { password, newpassword, renewpassword } = newInput;


    // Admin avatar function
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


    // Admin Edit profile function
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

    const HandleEditAdminProfile = async () => { 
        EditAdminProfile(newInput, currentAdmin); 
        setAdmin(prevAdmin => ({ ...prevAdmin, firstname: newInput.firstname, lastname: newInput.lastname, username: newInput.username, bio: newInput.bio }))
        setCurrentAdmin(prevAdmin => ({ ...prevAdmin, firstname: newInput.firstname, lastname: newInput.lastname, username: newInput.username, bio: newInput.bio }))
        setEditProfile(false);
    }


    // Admin email setting function
    const HandleEmailSettingBox = () => { setEmailSetting(true); setBackupEmailAction(null); }

    const HandleCloseEmailSettingBox = () => { setEmailSetting(false); setEditPrimaryEmail(false); setIsClicked (false); }

    const HandleEditPrimaryEmail = () => { setEditPrimaryEmail(true); setIsClicked(true); setBackupEmailAction(null); }

    const HandleCloseEditPrimaryEmail = () => { setEditPrimaryEmail(false); setIsClicked(false); newInput.editemail = null }

    const HandleSaveEditPrimaryEmail = () => {
        setVerify({
            message: 'You need to enter your password to confirm: ',
            action: async (password) => {
                if (password) {
                    try {
                        const result = await EditPrimaryEmail(setError, setSuccess, newInput, currentAdmin, password);
                        if (result.success) {
                            setSuccessfully({ message: 'Primary email updated successfully!', type: 'success' });
                            setTimeout(() => { setSuccessfully(false); setVerify(null); setEditPrimaryEmail(null); setIsClicked(null); }, 2000);
                            setVerifyPassword(''); setSuccess(false); setError(false);
                            setAdmin(prevAdmin => ({ ...prevAdmin, email: newInput.editemail }));
                            setCurrentAdmin(prevAdmin => ({ ...prevAdmin, email: newInput.editemail }));
                            localStorage.setItem("admin", JSON.stringify({ ...currentAdmin, email: newInput.editemail }));
                        }
                    }
                    catch (err) {
                        setError("Incorrect password!");
                        setSuccessfully(false);
                    }
                }
                else {
                    setError("Password is required!");
                    setSuccessfully(false);
                }
            }
        })
    }

    const HandleAddBackupEmailBox = () => { setAddBackupEmail(true); setEditPrimaryEmail(false); setIsClicked (false); }

    const HandleCloseBacupEmailBox = () => { setAddBackupEmail(false); newInput.backupemail = null }

    const HandleAddBackupEmail = async () => { 
        await AddBackupEmail(IsBackupEmailValid, newInput, currentAdmin) 
        setTimeout(() => { setAddBackupEmail(null); }, 1000)
        setAdmin(prevAdmin => ({ ...prevAdmin, backupemail: newInput.backupemail }));
        setCurrentAdmin(prevAdmin => ({ ...prevAdmin, backupemail: newInput.backupemail }));
        localStorage.setItem("admin", JSON.stringify({ ...currentAdmin, backupemail: newInput.backupemail }));
        newInput.backupemail = null;
    }

    const HandleBackupEmailActionBox = () => { setBackupEmailAction(Show => !Show); setEditPrimaryEmail(false); setIsClicked(false); }

    const HandleDeleteBackupEmail = () => { 
        setWarning({
            message: 'Are you sure you want to delete this email?',
            action: async () => {
                await DeleteBackupEmail(setSuccess, setError, currentAdmin);
                setBackupEmailAction(false);
                setAdmin(prevAdmin => ({ ...prevAdmin, backupemail: null }));
                setCurrentAdmin(prevAdmin => ({ ...prevAdmin, backupemail: null }));
                localStorage.setItem("admin", JSON.stringify({ ...currentAdmin, backupemail: null }));
                setWarning(false);
            }
        })
    }

    const HandleSetPrimaryBackupEmail = () => {
        setVerify({
            message: 'Are you sure you want to set this email as primary: ',
            action: async (password) => {
                if (password) {
                    try {
                        const result = await SetPrimaryBackupEmail(setSuccess, setError, currentAdmin, password);
                        if (result.success) {
                            setSuccessfully({ message: 'Backup email has been set to primary email!', type: 'success' })
                            setTimeout(() => { setSuccessfully(false); setVerify(null); setBackupEmailAction(null); }, 2000);
                            setVerifyPassword(''); setSuccess(false); setError(false);
                            setAdmin(prevAdmin => ({ ...prevAdmin, email: newInput.backupemail, backupemail: newInput.email }));
                            setCurrentAdmin(prevAdmin => ({ ...prevAdmin, email: newInput.backupemail, backupemail: newInput.email }));
                            localStorage.setItem("admin", JSON.stringify({ ...currentAdmin, email: newInput.backupemail, backupemail: newInput.email }));
                        }
                    }
                    catch (err) {
                        setError("Incorrect password!");
                        setSuccessfully(false);
                    }
                }
                else {
                    setError("Password is required!");
                    setSuccessfully(false);
                }
            }
        })
    }

    const HandleDeletePrimaryEmail = () => {
        setVerify({
            message: 'Are you sure you want to delete this primary email: ',
            action: async (password) => {
                if (password) {
                    try {
                        const result = await DeletePrimaryEmail(setSuccess, setError, currentAdmin, password);
                        if (result.success) {
                            setSuccessfully({ message: 'Primary email has been deleted!', type: 'success' })
                            setTimeout(() => { setSuccessfully(false); setVerify(null); }, 2000);
                            setVerifyPassword(''); setSuccess(false); setError(false); setBackupEmailAction(null);
                            setAdmin(prevAdmin => ({ ...prevAdmin, email: newInput.backupemail, backupemail: null }));
                            setCurrentAdmin(prevAdmin => ({ ...prevAdmin, email: newInput.backupemail, backupemail: null }));
                            localStorage.setItem("admin", JSON.stringify({ ...currentAdmin, email: newInput.backupemail, backupemail: null }));
                        } 
                    }
                    catch (err) {
                        setError("Incorrect password!");
                        setSuccessfully(false);
                    }
                }
                else {
                    setError("Password is required!");
                    setSuccessfully(false);
                }
            }
        })
    }


    // Admin password setting function
    const HandlePasswordSettingBox = () => { setPasswordSetting(true); }

    const HandleClosePassowrdSettingBox = () => { setPasswordSetting(null); }

    const HandleChangePassword = async () => {
        await ChangePassword(setError, setSuccess, AdminLogoutContext, currentAdmin, password, newpassword, renewpassword);
    }


    // Waring box
    const HandleWarningConfirm = async () => { if(warning?.action) { await warning.action(); } };
    const HandleWarningCancel = () => { setWarning(null); };


    // Verify box 
    const HandleVerifyConfirm = async () => { if(verify?.action) { await verify.action(verifyPassword); } };
    const HandleVerifyCancel = () => { setVerify(null); setError(null); setVerifyPassword(null); };
    

    return (
        <AdminProfile 
            admin = { admin }

            // Error
            error = { error }

            // Success
            success = { success }

            // Successfully notification
            successfully = { successfully }

            // Waring box
            warning = { warning }
            HandleWarningConfirm = { HandleWarningConfirm }
            HandleWarningCancel = { HandleWarningCancel }

            // Verify box
            verify = { verify }
            HandleVerifyConfirm = { HandleVerifyConfirm }
            HandleVerifyCancel = { HandleVerifyCancel }

            // Data change
            HandleInputChange = { HandleInputChange }

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
            focusedInput = { focusedInput }
            HandleFocus = { HandleFocus }
            HandleBlur =  { HandleBlur }
            HandleEditAdminProfile = { HandleEditAdminProfile }

            // Email setting
            emailSetting = { emailSetting }
            HandleEmailSettingBox = { HandleEmailSettingBox }
            HandleCloseEmailSettingBox = { HandleCloseEmailSettingBox }
            editPrimaryEmail = { editPrimaryEmail }
            isClicked = { isClicked }
            HandleEditPrimaryEmail = { HandleEditPrimaryEmail }
            HandleCloseEditPrimaryEmail = { HandleCloseEditPrimaryEmail }
            IsEmailChange = { IsEmailChange }
            HandleSaveEditPrimaryEmail = { HandleSaveEditPrimaryEmail }
            verifyPassword = { verifyPassword }
            setVerifyPassword = { setVerifyPassword }
            showPassword = { showPassword }
            setShowPassword = { setShowPassword }
            addBackupEmail = { addBackupEmail }
            HandleAddBackupEmailBox = { HandleAddBackupEmailBox }
            IsBackupEmailValid = { IsBackupEmailValid }
            IsBackupEmailChange = { IsBackupEmailChange }
            HandleCloseBacupEmailBox = { HandleCloseBacupEmailBox }
            HandleAddBackupEmail = { HandleAddBackupEmail }
            backupEmailAction = { backupEmailAction }
            HandleBackupEmailActionBox = { HandleBackupEmailActionBox }
            HandleDeleteBackupEmail = { HandleDeleteBackupEmail }
            HandleSetPrimaryBackupEmail = { HandleSetPrimaryBackupEmail }
            HandleDeletePrimaryEmail = { HandleDeletePrimaryEmail }

            // Password setting
            passwordSetting = { passwordSetting }
            HandlePasswordSettingBox = { HandlePasswordSettingBox } 
            HandleClosePassowrdSettingBox = { HandleClosePassowrdSettingBox }
            IsPasswordChange = { IsPasswordChange }
            HandleChangePassword = { HandleChangePassword }
        />
    )
}

export default Profile;