import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState(JSON.parse(localStorage.getItem("admin") || null));

    const AdminLoginContext = async (input) => {
        try{
            const response = await axios.post('/auth/admin/login', input);
            setCurrentAdmin(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(currentAdmin))
    }, [currentAdmin])

    return (
        <AdminContext.Provider value = {{ currentAdmin, setCurrentAdmin, AdminLoginContext }}>
            { children }
        </AdminContext.Provider>
    )
}

export { 
    AdminContext, 
    AdminContextProvider 
}