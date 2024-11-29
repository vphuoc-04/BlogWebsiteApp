import axios from 'axios';
import moment from 'moment';

const CreatePostService = async (event, title, foreword, des, file, images, reactQuillRef) => {
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

        for (const image of images) {
            const uploadResponse = await axios.post(`/image-post/${postId}`, {
                temp_image_path: image
            });
        
            if (uploadResponse.status === 200) {
                const uploadedImages = Array.isArray(uploadResponse.data.image_path)
                    ? uploadResponse.data.image_path
                    : [uploadResponse.data.image_path];
        
                let updatedDes = des;

                images.forEach(image => {
                    const imageName = image.split("/").pop(); 
                    const tempImagePath = `/upload/temp/${imageName}`;
                    const postImagePath = `/upload/posts/${postId}/images/${imageName}`;
                    updatedDes = updatedDes.replace(tempImagePath, postImagePath); 
                });
    
                await axios.put(`/post/update-des/${postId}`, {
                    des: updatedDes
                });
        
                for (const imagePath of uploadedImages) {
                    const quill = reactQuillRef.current.getEditor();
                    quill.insertEmbed(quill.getSelection()?.index || 0, "image", imagePath);
                }
        
                await axios.post(`/post/images/${postId}`, {
                    image_path: uploadedImages.join(','),
                    uploaded_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                });
            } else {
                console.log(`Failed to upload image for post ID: ${postId}`);
            }
        }              

        return { success: true, message: "Post created successfully." };
    } 
    catch (err) {
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
