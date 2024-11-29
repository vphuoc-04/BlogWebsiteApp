const SinglePage = ({
    // Post
    post,
    getText
}) => {

    if (!post) return <p>Loading...</p>;

    return (
        <div className = "SinglePage">
            <div className = "Container" key = { post.id }>
                <h1>{ post.title }</h1>
                <img src = {`/upload/posts/${post.id}/thumbnail/${post.thumbnail}`} alt = "Thumbnail" />
                <p>{ post.foreword }</p>
                <div className = "Description" 
                    dangerouslySetInnerHTML={{ __html: post.des }} 
                />
            </div>
        </div>
    );
}

export { SinglePage };
