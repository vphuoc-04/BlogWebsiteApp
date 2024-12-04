import React from 'react'
import { useLocation } from 'react-router-dom';
import { AdminListPost } from '../../core/admin/AdminListPost';
import { PostData } from '../../data/PostData';
import { DeletePostService } from '../../services/PostService';

const ListPost = () => {
    const id = useLocation().search;
    const [post] = PostData({ id });

    // Handle delete post
    const HandleDeletePost = async (id) => {
        await DeletePostService(id);
    }
    

    return (
        <AdminListPost 
            // Post
            post = { post }

            // Handle
            HandleDeletePost = { HandleDeletePost }
        />
    )
}

export default ListPost;