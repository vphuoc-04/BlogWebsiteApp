import React from 'react'
import { useLocation } from 'react-router-dom';
import { AdminListPost } from '../../core/admin/AdminListPost';
import { PostData } from '../../data/PostData';

const ListPost = () => {
    const id = useLocation().search;
    const [post] = PostData({ id });

    return (
        <AdminListPost 
            // Post
            post = { post }
        />
    )
}

export default ListPost;