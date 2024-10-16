import React, { useContext } from 'react'
import { AdminContext } from '../../context/AuthContext'
import { AboutPage } from '../../core/pages/AboutPage'
import { AdminData } from '../../data/AdminData'

const About = () => {
    const { currentAdmin } = useContext(AdminContext);
    const [admin] = AdminData(currentAdmin);

    return (
        <AboutPage 
            // Admin
            admin = { admin }
        />
    )
}

export default About