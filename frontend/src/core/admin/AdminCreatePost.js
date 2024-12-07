import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminCreatePost = ({
    // Create post
    title,
    setTitle,
    foreword,
    setForeword,
    des,
    setDes,
    filePreview,
    showMenu,
    isChangingThumbnail,

    // React-quill
    modules,
    reactQuillRef,

    // Handle
    HandleThumbnailUpload,
    HandleThumbnailChange, 
    HandleDownloadThumbnail,
    HandleHover,
    HandleCreatePost,
}) => {
    return (
        <div className = "AdminCreatePost">
            <div className = "CreatePost">
                <div className = "Title">
                    <p>Title</p>
                    <input 
                        type = "text"
                        placeholder = "Title"
                        value = { title }
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className = "Foreword">
                    <p>Fore word</p>
                    <input 
                        type = "text"
                        placeholder = "Foreword"
                        value = { foreword }
                        onChange = {(e) => setForeword(e.target.value)}
                    />
                </div>
                <div className = "Descripe">
                    <p>Descripe</p>
                    <ReactQuill 
                        className = "Des"
                        theme = "snow"
                        value = { des }
                        onChange = { setDes }
                        modules = { modules }
                        ref = { reactQuillRef }
                    />
                </div>
                <div className = "Thumbnail">
                    <input
                        style = {{ display: "none" }}
                        type = "file"
                        id = "file"
                        name = ""
                        onChange = { HandleThumbnailUpload }
                        disabled = { !!filePreview && !isChangingThumbnail }
                    />
                    <label className = "file" htmlFor = "file">
                        {filePreview ? (
                            <div className = "ThumbnailPreview">
                                <img src = {filePreview} alt="" />
                                <div className = "ThumbnailOptions">
                                    <span
                                        className = "verticalIcon"
                                        onMouseEnter = {() => HandleHover(true)}
                                        onMouseLeave = {() => HandleHover(false)}
                                    >
                                        &#8942;
                                    </span>
                                    {showMenu && (
                                        <div
                                            className = "menu"
                                            onMouseEnter = {() => HandleHover(true)}
                                            onMouseLeave = {() => HandleHover(false)}
                                        >
                                            <button
                                                onClick = {() => {
                                                    document.getElementById("file").click(); 
                                                    HandleThumbnailChange();
                                                }}
                                            >
                                                Change Thumbnail
                                            </button>
                                            <button onClick = { HandleDownloadThumbnail }>
                                                Download Image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <span>Upload Thumbnail</span>
                        )}
                    </label>
                </div>
            </div>
            <button className = "CreatePostButton" onClick = { HandleCreatePost }>
                Create post
            </button>
        </div>
    )
}

export { AdminCreatePost }