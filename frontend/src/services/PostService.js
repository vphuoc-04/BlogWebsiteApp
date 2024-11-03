import axios from "axios";
import moment from "moment"

const CreatePostService = async (event, title, foreword, des, file) => {
    event.preventDefault();
    try {
        const formData = new FormData();
        formData.append("file", file);
        const thumbnailResponse = await axios.post("/post-thumbnail", formData);
        
        const thumbnailUrl = thumbnailResponse.data;
        
        const response = await axios.post("/post/", {
            title: title,
            foreword: foreword,
            des: des,
            thumbnail: thumbnailUrl,
            posted_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });

        return response.data;
    } 
    catch (err) {
        console.log(err);
        if (err.response) {
            console.error(err.response.data); 
        } 
        else {
            console.error(err.message); 
        }
    }
};

export {
    CreatePostService
}