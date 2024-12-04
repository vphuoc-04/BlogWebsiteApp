const AdminListPost = ({
    // Post
    post,

    // Handle
    HandleDeletePost
}) => {
    return (
        <div className = "AdminListPost">
            {post.map((p) => (
                <div className = "Container" key = { p.id }>
                    <div className = "Content">
                        <div className = "Thumbnail">
                            <img src = {`../upload/posts/${p.id}/thumbnail/${p.thumbnail}`} />
                        </div>
                        <div className = "Text">
                            <p className = "Title">{ p.title }</p>
                            <p className = "Foreword">{ p.foreword }</p>
                        </div>
                    </div>
                    <div className = "Actions">
                        <div className = "DeletePost" onClick = {() => HandleDeletePost(p.id) }>
                            <i class = "fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export { AdminListPost }