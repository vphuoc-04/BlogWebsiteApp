import { useState } from "react"

const AdminData = (currentAdmin) => {
    const [admin, setAdmin] = useState({
        avatar: currentAdmin?.avatar,
        firstname: currentAdmin?.firstname,
        lastname: currentAdmin?.lastname,
        username: currentAdmin?.username,
        bio: currentAdmin?.bio,
        email: currentAdmin?.email,
        backupemail: currentAdmin?.backupemail
    })

    return [admin, setAdmin];
}

export { AdminData }