const AdminListPost = ({
    // Post
    post
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
                </div>
            ))}
        </div>
    )
}

export { AdminListPost }