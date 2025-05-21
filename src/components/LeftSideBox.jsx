import { useMemo } from "react";

export default function LeftSideBox({
    posts
}) {

    const getTopThreePostsByReaction = (posts) => {
        return posts
        .sort((a, b) => b.socialActivityCountsInsight.totalReactionCount - a.socialActivityCountsInsight.totalReactionCount)
        .slice(0, 3);
    };

    const topThreePosts = useMemo(() => getTopThreePostsByReaction(posts), [posts])
    return (
        <>
            <aside className="col-md-4 mb-4">
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Most Engaged Posts</h5>
                    <ul className="list-unstyled">
                        {topThreePosts.map(post => (
                        <li key={post.urn} className="mb-3">
                            <a href={post.url} className="text-decoration-none">
                            <strong
                                style={{   
                                    overflow: "hidden",                                 
                                    textOverFlow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "3",
                                    WebkitBoxOrient: "vertical"
                                }}
                            >{post.text}</strong><br />
                            <small className="text-muted">by {post.author.fullName}</small>
                            </a>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}