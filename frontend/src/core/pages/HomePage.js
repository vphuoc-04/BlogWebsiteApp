import { Link } from "react-router-dom"

const HomePage = ({
    // Admin
    admin,

    // Post
    post
}) => {
    return (
        <div className = "HomePage">
            <a className = "Name" href = "/">
                { admin.firstname } { admin.lastname }
            </a>
            <div className = "Work">
                { admin.work }
            </div>
            <div className = "Posts">
                {post.map((p) => (
                    <div className = "Container" key = { p.id }>
                        <Link className = "Thumbnail" to = {`/post/${p.id}`}>
                            <img src = {`../upload/posts/${p.id}/thumbnail/${p.thumbnail}`} />
                        </Link>
                        <p className = "Title">{ p.title }</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { HomePage }