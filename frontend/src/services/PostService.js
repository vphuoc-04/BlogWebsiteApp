import axios from "axios";
import moment from "moment";

const CreatePostService = async (event, title, foreword, des, file) => {
    event.preventDefault();
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/post/", {
            title: title,
            foreword: foreword,
            des: des,
            posted_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });

        const postId = response.data.postId;

        if (!postId) {
            throw new Error("Failed to get postId.");
        }

        const thumbnailResponse = await axios.post(`/post-thumbnail/${postId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        const thumbnailUrl = thumbnailResponse.data;

        await axios.put(`/post/thumbnail/${postId}`, {
            thumbnail: thumbnailUrl
        });

        return { success: true, message: "Post created successfully." };
    } 
    catch (err) {
        console.log(err);

        if (err.response) {
            console.error(err.response.data); 
        } 
        else {
            console.error(err.message); 
        }

        return { success: false, message: err.message };
    }
};

export { CreatePostService };
