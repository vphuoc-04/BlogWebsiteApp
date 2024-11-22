import { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePostData = (postId) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/post/data/${postId}`); 
                setPost(response.data);
            } 
            catch (err) {
                console.log(err);
            }
        };

        if (postId) {
            fetchData();
        }
    }, [postId]);

    return { post };
};

export { SinglePostData }
