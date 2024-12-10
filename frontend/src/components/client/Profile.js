import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../../core/client/UserProfile'
import { GetUserByUsername } from '../../services/UserService';

const Profile = () => {
    const { username } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (username) {
            GetUserByUsername(username, setUser);
        }
    }, [username]);

    return (
        <UserProfile 
            user = { user }
        />
    )
}

export default Profile;