import React, { useState, useRef } from 'react';
import { AdminCreatePost } from '../../core/admin/AdminCreatePost';
import { useLocation } from 'react-router-dom';
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
    const [isChangingThumbnail, setIsChangingThumbnail] = useState(false);

    const HandleThumbnailUpload = (event) => {
        if (filePreview && !isChangingThumbnail) { return; } 

        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
                setShowMenu(false);
                setIsChangingThumbnail(false); 
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const HandleThumbnailChange = () => {
        setFile(null); 
        setFilePreview(null); 
        setIsChangingThumbnail(true); 
        document.getElementById("file").click(); 
    };

    const HandleDownloadThumbnail = () => {
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
            isChangingThumbnail = { isChangingThumbnail }
            
            // Handle
            HandleThumbnailUpload = { HandleThumbnailUpload }
            HandleThumbnailChange = { HandleThumbnailChange } 
            HandleDownloadThumbnail = { HandleDownloadThumbnail }
            HandleHover = { HandleHover }
            HandleCreatePost = { HandleCreatePost }
        />
    )
}

export default CreatePost;
