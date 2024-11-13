import axios from 'axios';
import moment from 'moment';

const CreatePostService = async (event, title, foreword, des, file, images) => {
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

        // Duyệt qua mảng hình ảnh và gửi từng ảnh lên server
        for (const image of images) {
            const imageFormData = new FormData();
            imageFormData.append("file", image);

            const uploadResponse = await axios.post(`/image-post/${postId}`, imageFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log(uploadResponse.data);

            if (uploadResponse.status === 200) {
                const uploadedImages = Array.isArray(uploadResponse.data) ? uploadResponse.data : [uploadResponse.data];

                // Gửi các đường dẫn ảnh đã upload lên server để lưu vào cơ sở dữ liệu
                for (const imagePath of uploadedImages) {
                    await axios.post(`/post/images/${postId}`, { 
                        image_path: imagePath, 
                        uploaded_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                    });
                }
            } else {
                console.log(`Failed to upload image for post ID: ${postId}`);
            }
        }

        return { success: true, message: "Post created successfully." };
    } catch (err) {
        console.log(err);

        if (err.response) {
            console.error(err.response.data); 
        } else {
            console.error(err.message); 
        }

        return { success: false, message: err.message };
    }
};

export { CreatePostService };
