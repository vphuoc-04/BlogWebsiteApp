import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../../core/client/UserProfile'
import { UserContext } from '../../context/AuthContext';
import { UserData } from '../../data/UserData';
import { 
    GetUserByUsername, 
    UploadUserAvatar 
} from '../../services/UserService';
import { UseUpdateCurrentUser } from '../../hooks/useAuth';

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const { username } = useParams();

    const [user, setUser] = UserData(currentUser);

    useEffect(() => {
        if (username) {
            GetUserByUsername(username, setUser);
        }
    }, [username]);

    UseUpdateCurrentUser(setUser, currentUser);

    // User avatar
    const [avatarAction, setAvatarAction] = useState(null);
    const [avatarView, setAvatarView] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [boxEditAvatar, setBoxEditAvatar] = useState(null);
    const [editAvatar, setEditAvatar] = useState(null);
    const [crop, setCrop] = useState(null);
    const [avatarViewAction, setAvatarViewAction] = useState(null);
    const [warning, setWarning] = useState(null);

    // User avatar function
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

    const HandleUploadUserAvatar = async () => {
        if (!crop) return;
        const blob = await fetch(crop).then(response => response.blob());
        const file = new File([blob], "UserAvatar.png", { type: 'image/png' });
        const avatarProfile = await UploadUserAvatar(file, currentUser, setCurrentUser);

        if (avatarProfile) {
            setUser(prevUser => ({ ...prevUser, avatar: avatarProfile }));
            setCurrentUser(prevUser => ({ ...prevUser, avatar: avatarProfile }));
            setCrop(null);
            setAvatarFile(null);
            setEditAvatar(false);
        }
        setBoxEditAvatar(false);
    }
    const HandleAvatarViewAction = () => { setAvatarViewAction(Show => !Show); }

    return (
        <UserProfile 
            // User
            user = { user }

            // Avatar user
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
            HandleUploadUserAvatar = { HandleUploadUserAvatar }
            avatarViewAction = { avatarViewAction }
            HandleAvatarViewAction = { HandleAvatarViewAction }
        />
    )
}

export default Profile;