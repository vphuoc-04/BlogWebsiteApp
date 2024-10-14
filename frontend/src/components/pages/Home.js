import React, { useContext } from 'react'
import { HomePage } from '../../core/pages/HomePage';
import { AdminContext } from '../../context/AuthContext'
import { AdminData } from '../../data/AdminData'

const Home = () => {
    const { currentAdmin } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);

    return (
        <HomePage 
            // Admin
            admin = { admin }
        />
    )
}

export default Home;