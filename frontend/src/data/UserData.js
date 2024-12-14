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

const DisplayUserAvatar = (avatar) => {

    const DefaultAvatar = (string) => { 
        const Pattern = /^https?:\/\//i; 
        return !!Pattern.test(string);
    }

    if (avatar) {
        if (DefaultAvatar(avatar)) {
            return <img src = { avatar } alt="" />
        }
        else {
            return <img src = { `../upload/clients/img/${avatar}` } alt = "" />;
        }
    }
}

export { UserData, DisplayUserAvatar }