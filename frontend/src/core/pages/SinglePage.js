const SinglePage = ({
    // Post
    post
}) => {
    return (
        <div className = "SinglePage">
            {post.map((p) => (
                <div className = "Container" key = { p.id }>
                    <h1>{ p.title }</h1>
                    <img src = {`../upload/posts/${p.id}/thumbnail/${p.thumbnail}`} />
                    <p>{ p.foreword }</p>
                    <p>{ p.des }</p>
                </div>
            ))}
        </div>
    )
}

export { SinglePage }