import { Link } from "react-router-dom"

const AdminListPost = ({
    // Post
    post
}) => {
    return (
        <div className = "AdminListPost">
            {post.map((p) => (
                <div className = "Container" key = { p.id }>
                    <Link className = "Thumbnail" to = {`/post/${p.id}/${p.slug}`}>
                        <img src = {`../upload/posts/${p.id}/thumbnail/${p.thumbnail}`} />
                    </Link>
                    <p className = "Title">{ p.title }</p>
                </div>
            ))}
        </div>
    )
}

export { AdminListPost }