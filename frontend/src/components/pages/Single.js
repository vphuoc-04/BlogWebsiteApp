import React from 'react'
import { SinglePage } from '../../core/pages/SinglePage';
import { useLocation } from 'react-router-dom';
import { PostData } from '../../data/PostData';

const Single = () => {
    // Post
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    
    const [post] = PostData({ id });

    return (
        <SinglePage 
            post = { post }
        />
    )
}

export default Single;