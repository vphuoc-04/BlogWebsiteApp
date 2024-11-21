import { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePostData = (slug, postId) => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/post/data/${slug}`, {
                    params: { postId: postId }
                });
                setPost(response.data);
            } 
            catch (err) {
                console.log(err);
            }
        };

        if (slug && postId) {
            fetchData();
        }
    }, [slug, postId]);

    return { post };
};

export { SinglePostData }
