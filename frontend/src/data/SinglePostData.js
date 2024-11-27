import { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePostData = (id) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/post/data/${id}`); 
                setPost(response.data);
            } 
            catch (err) {
                console.log(err);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return { post };
};

export { SinglePostData }
