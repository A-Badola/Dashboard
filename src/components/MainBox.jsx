export default function MainBox({
    posts
}) {
    return (
        <>
        <main className="col-md-8">
        {posts.map((post, index) => {
            return (
                    <div key={post.urn} className="card mb-4" id={`post-${post.urn}`}>
                        <div className="card-body">
                        {/* Post Header */}
                        <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center mb-2">
                            <img src={post.author.profilePictures?.[0].url ?? 'https://www.gravatar.com/avatar/?d=mp'} alt="Author" className="me-3 rounded-circle" style={{ width: '50px', height: '50px' }} />
                            <div>
                            <strong>{post.author.fullName}</strong><br />
                            <small className="text-muted">{post.author.headline}</small>
                            </div>
                        </div>
                        {/* View Source Button */}
                        <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                        >
                            View
                        </a>
                        </div>
                        <small className="text-muted">Posted on {new Date(post.postedDate).toLocaleDateString()}</small>
                        
                        {/* Post Body */}
                        <p>
                            {post.text}
                        </p>

                        {/* Shared Post */}
                        {post.reposted && post?.resharedPost && <div className="p-3 mt-3 border rounded bg-light">
                            <div className="d-flex align-items-center mb-2">
                            <div>
                                <strong>{`${post?.resharedPost?.author?.firstName ?? ''} ${post?.resharedPost?.author?.lastName ?? ''}`}</strong><br />
                            </div>
                            </div>
                            <p>
                            {post?.resharedPost?.text}
                            </p>

                            {post?.resharedPost?.image && post?.resharedPost?.image?.length > 0 && <img src={post?.resharedPost?.image[post?.resharedPost?.image?.length - 1].url} className="img-fluid rounded mb-2" alt="Shared Post Visual" />}

                            {post?.resharedPost?.video && post?.resharedPost?.video?.length > 0 && <video controls className="w-100 rounded" poster={post?.resharedPost?.video?.[0]?.poster} >
                                <source autoPlay muted playsInline src={post?.resharedPost?.video?.[0]?.url} type="video/mp4" />
                            </video>}
                        </div>}

                        {/* Reactions */}
                        <div className="d-flex gap-3 mt-3 text-muted" style={{ fontSize: '0.7rem' }}>
                            <div>👍 {post.socialActivityCountsInsight?.likeCount ?? 0} Likes</div>
                            <div>💬 {post.socialActivityCountsInsight?.numComments ?? 0} Comments</div>
                            <div>🟢 {post.socialActivityCountsInsight?.numComments ?? 0} reactions </div>
                        </div>
                        </div>
                    </div>
            )
        })}
        </main>
        </>
    )
}