import { useState } from "react"

const UserData = (currentUser) => {
    const [user, setUser] = useState({
        avatar: currentUser?.avatar,
        firstname: currentUser?.firstname,
        lastname: currentUser?.lastname,
        username: currentUser?.username,
        email: currentUser?.email,
        password: currentUser?.password,
        created_at: currentUser?.created_at
    })

    return [user, setUser];
}

export { UserData }