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

const DisplayAdminAvatar = (avatar) => {

    const DefaultAvatar = (string) => { 
        const Pattern = /^https?:\/\//i; 
        return !!Pattern.test(string);
    }

    if (avatar) {
        if (DefaultAvatar(avatar)) {
            return <img src = { avatar } alt="" />
        }
        else {
            return <img src = { `../upload/admin/img/${avatar}` } alt = "" />;
        }
    }
}

export { AdminData, DisplayAdminAvatar }