const SinglePage = ({
    // Post
    post,
    getText
}) => {
    return (
        <div className = "SinglePage">
            <div className = "Container" key = { post.slug }>
                <h1>{ post.title }</h1>
                <img src = {`../upload/posts/${post.id}/thumbnail/${post.thumbnail}`} alt = "Thumbnail" />
                <p>{ post.foreword }</p>
                <p>{ getText(post.des) }</p>
                
                {/* <div className = "ImageGallery">
                    {p.images.split(',').map((image, index) => (
                        <img key = {index} src = {`../upload/posts/${p.id}/images/${image}`} alt = {`Image ${index + 1}`} />
                    ))}
                </div> */}
            </div>
        </div>
    );
}

export { SinglePage };
