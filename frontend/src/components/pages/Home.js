import React, { useContext } from 'react'
import { HomePage } from '../../core/pages/HomePage';
import { AdminContext } from '../../context/AuthContext'
import { AdminData } from '../../data/AdminData'
import { useLocation } from 'react-router-dom';
import { PostData } from '../../data/PostData';

const Home = () => {
    const { currentAdmin } = useContext(AdminContext)
    const [admin, setAdmin] = AdminData(currentAdmin);
    
    // Post
    const id = useLocation().search;
    const [post] = PostData({ id });

    return (
        <HomePage 
            // Admin
            admin = {admin}

            // Post
            post = {post}
        />
    )
}

export default Home;
