import { useState } from "react"

const AdminData = (currentAdmin) => {
    const [admin, setAdmin] = useState({
        avatar: currentAdmin?.avatar,
        firstname: currentAdmin?.firstname,
        lastname: currentAdmin?.lastname,
        username: currentAdmin?.username,
        work: currentAdmin?.work,
        bio: currentAdmin?.bio,
        email: currentAdmin?.email,
        backupemail: currentAdmin?.backupemail,
        newpassword: '',
        renewpassword: ''
    })

    return [admin, setAdmin];
}

const defaultAvatar = 'https://imgur.com/AhaZ0qB.jpg';

export { AdminData, defaultAvatar }