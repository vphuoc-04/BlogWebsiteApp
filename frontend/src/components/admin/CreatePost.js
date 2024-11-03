import React, { useState } from 'react'
import { AdminCreatePost } from '../../core/admin/AdminCreatePost'
import { useLocation } from 'react-router-dom'
import { CreatePostService } from '../../services/PostService';

const CreatePost = () => {
    const state = useLocation().state;

    // Post 
    const [title, setTitle] = useState(state?.title);
    const [foreword, setForeword] = useState(state?.foreword || "");
    const [des, setDes] = useState(state?.des || "");

    // Error
    const [error, setError] = useState(null);

    // Thumbnail
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const [showMenu, setShowMenu] = useState(false);

    const HandleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); 

            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const HandleDownloadImage = () => {
        if (filePreview) {
            const link = document.createElement("a");
            link.href = filePreview;
            link.download = "thumbnail.jpg";
            link.click();
        }
        setShowMenu(null);
    };

    const HandleHover = (isEntering) => {
        if (isEntering) {
            setShowMenu(true);
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
        } 
        else {
            const id = setTimeout(() => setShowMenu(false), 1500);
            setTimeoutId(id);
        }
    };

    // Handle create post
    const HandleCreatePost = async (event) => { await CreatePostService(event, title, foreword, des, file); }

    return (
        <AdminCreatePost 
            // Create post
            title = { title }
            setTitle = { setTitle }
            foreword = { foreword }
            setForeword = { setForeword }
            des = { des }
            setDes = { setDes }
            file = { file }
            setFile = { setFile }
            filePreview = { filePreview }
            showMenu = { showMenu }
            setShowMenu = { setShowMenu }

            // Handle
            HandleFileChange = { HandleFileChange }
            HandleDownloadImage = { HandleDownloadImage }
            HandleHover = { HandleHover }
            HandleCreatePost = { HandleCreatePost }
        />
    )
}

export default CreatePost;