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
                        <p>{ p.title }</p>
                        <p>{ p.des }</p>
                        <p>{ p.foreword }</p>
                        <img src = { `../upload/posts/${p.thumbnail}` } />
                    </div>
                ))}
            </div>
        </div>
    )
}

export { HomePage }