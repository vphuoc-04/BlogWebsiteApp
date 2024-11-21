import React, { useState, useRef, useCallback } from 'react';
import { AdminCreatePost } from '../../core/admin/AdminCreatePost';
import { useLocation } from 'react-router-dom';
import { CreatePostService } from '../../services/PostService';
import ReactQuill from 'react-quill';

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

    // Image belong post
    const reactQuillRef = useRef(ReactQuill);
    const [images, setImages] = useState([]);

    const HandleImageUpload = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
    
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                try {
                    const file = input.files[0];
                    const fileURL = URL.createObjectURL(file); 
    
                    const quill = reactQuillRef.current.getEditor();
                    const range = quill.getSelection();
                    if (range) {
                        quill.insertEmbed(range.index, "image", fileURL);
                    }
                    setImages((prevImages) => [...prevImages, file]);
                } 
                catch (err) {
                    console.error('Error uploading image:', err);
                }
            }
        };
    }, []);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }], 
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                [{ align: [] }],
                ['clean']
            ],
            handlers: {
                image: HandleImageUpload,  
            },
        }
    };

    // Handle create post
    const HandleCreatePost = async (event) => { 
        const result = await CreatePostService(event, title, foreword, des, file, images); 
        if (!result.success) {
            setError(result.message);
        }
    }

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

            // React-quill
            modules = { modules }
            reactQuillRef = { reactQuillRef }
            
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
