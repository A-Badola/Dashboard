import { useEffect, useState } from "react";
import LeftSideBox from "./LeftSideBox";
import MainBox from "./MainBox";
//import { apiResponseSample, searchAPIResponse } from "../constants/responseConstant";
import SearchAndFilter from "./searchAndFilter";
import { filterConstants } from "../constants/dashboardConstants";
import useFetchPosts from "../hooks/useFetchPosts";

function Dashboard() {
    const {loading, posts, fetchPosts, error} = useFetchPosts();
    const [activeFilters, setActiveFilters] = useState(Array(Object.keys(filterConstants).length).fill(false));
    const [searchConditions, setSearchConditions] = useState({
        searchKeyword: '',
        searchAuthorName: ''
    });

    const filterPosts = () => {
        let newPostsList = posts;
        if (activeFilters[filterConstants.ORIGINAL]) {
            newPostsList = newPostsList.filter(post => {
                const hasReposted = post.reposted === true;
                return !hasReposted;
            });
        }
        if(activeFilters[filterConstants.RESHARED]) {
            newPostsList = newPostsList.filter(post => {
                const hasResharedPost = !!post.resharedPost; 
                return hasResharedPost;
            });
        }
        if(activeFilters[filterConstants.VIDEO_POST]) {
            newPostsList = newPostsList.filter(post => {
                const hasVideo = post.video && (post.video.video !== null);
                return hasVideo;
            });
        }

        searchConditions.searchKeyword && (newPostsList = filterPostsBySearchConditions(newPostsList, searchConditions));
        searchConditions.searchAuthorName && (newPostsList = filterPostsBySearchConditions(newPostsList, searchConditions));
        return newPostsList;
    }

    const filterChange = (idx) => {
        const newFilters = activeFilters.slice();
        newFilters[idx] = !newFilters[idx];
        setActiveFilters(newFilters);
    }

    const handleSearchConditionsChange = (newConditions) => {
        setSearchConditions(newConditions);
    }

    function filterPostsBySearchConditions(posts, { searchKeyword = '', searchAuthorName = '' }) {
        return posts.filter(post => {
            const text = post.text?.toLowerCase() || '';
            const author = post.author?.fullName?.toLowerCase() || '';

            const keywordMatch = searchKeyword
            ? new RegExp(`\\b${searchKeyword.toLowerCase()}\\b`).test(text)
            : true;

            const authorNameMatch = searchAuthorName
            ? new RegExp(`\\b${searchAuthorName.toLowerCase()}\\b`).test(author)
            : true;

            return keywordMatch && authorNameMatch;
        });
    }

    useEffect(() => {
        fetchPosts({searchKeyword: null});
    }, []);

    useEffect(() => {
        console.log(85);
        if (posts.length > 0) {
            console.log("Posts fetched successfully:", posts);
        }
    }, [posts]);

    return (
        <>
            <div className="container bg-light py-4">
            {/* Search & Filters */}
                <div className="row mb-4">
                    <SearchAndFilter 
                        filterChange={filterChange}
                        activeFilters={activeFilters}
                        searchConditions={searchConditions}
                        handleSearchConditionsChange={handleSearchConditionsChange}
                    />
                </div>

                {/* Sidebar + Main Content */}
                <div className="row">
                    {/* Sidebar */}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {loading && <div className="alert alert-info">Loading posts...</div>}
                    {!loading && !error && <>
                            {/* Left Side Box */}
                            <LeftSideBox 
                                posts={posts}
                            />

                            {/* Main Content */}
                            <MainBox 
                                posts={filterPosts()}
                            />
                        </>                    
                    }                    
                </div>
            </div>       
        </>
    )
}

export default Dashboard;