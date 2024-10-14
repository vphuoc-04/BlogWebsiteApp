import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

// Admin
const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState(JSON.parse(localStorage.getItem("admin") || null));

    const AdminLoginContext = async (input) => {
        try {
            const response = await axios.post('/auth/admin/login', input);
            setCurrentAdmin(response.data);
        } 
        catch(err) {
            console.log(err);
        }
    }

    const AdminLogoutContext = async () => {
        await axios.post("/auth/admin/logout");
        setCurrentAdmin(null);
    }

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(currentAdmin))
    }, [currentAdmin])

    return (
        <AdminContext.Provider value = {{ currentAdmin, setCurrentAdmin, AdminLoginContext, AdminLogoutContext }}>
            { children }
        </AdminContext.Provider>
    )
}

// User
const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));

    const UserLoginContext = async (input) => {
        try {
            const response = await axios.post('/auth/user/login', input);
            setCurrentUser(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const UserLogoutContext =  async () => {
        await axios.post("/auth/user/logout");
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <UserContext.Provider value = {{ currentUser, setCurrentUser, UserLoginContext, UserLogoutContext }}>
            { children }
        </UserContext.Provider>
    )
}

export { 
    AdminContext, 
    AdminContextProvider,
    UserContext, 
    UserContextProvider
}