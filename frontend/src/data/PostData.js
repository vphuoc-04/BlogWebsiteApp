import { useEffect, useState } from "react";
import axios from "axios";

const PostData = ({ id }) => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await axios.get(`/post/data/${id}`);
                setPost(response.data);
            }
            catch(err) {
                console.log(err);
            }
        }
        FetchData();
    }, [id])

    return [post, setPost];
}

export { PostData }