import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../../core/client/UserProfile'
import { UserContext } from '../../context/AuthContext';
import { UserData } from '../../data/UserData';
import { 
    GetUserByUsername, 
} from '../../services/UserService';

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const { username } = useParams();

    const [user, setUser] = UserData(currentUser);

    useEffect(() => {
        if (username) {
            GetUserByUsername(username, setUser);
        }
    }, [username]);


    // User avatar
    const [avatarAction, setAvatarAction] = useState(null);
    const [avatarView, setAvatarView] = useState(null);
    const [avatarViewAction, setAvatarViewAction] = useState(null);

    // User avatar function
    const HandleAvatarActionSelect = () => { setAvatarAction(Show => !Show); }

    const HandleAvatarView = () => { setAvatarView(true); setAvatarAction(false); }

    const HandleCloseAvatarView = () => { setAvatarView(false); setAvatarViewAction(null); }

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
            avatarViewAction = { avatarViewAction }
            HandleAvatarViewAction = { HandleAvatarViewAction }
        />
    )
}

export default Profile;