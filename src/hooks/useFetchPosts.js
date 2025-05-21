import { useState } from "react";
// import { apiResponseSample, searchAPIResponse } from "../constants/responseConstant";

export default function useFetchPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosts = async ({searchKeyword : keyword}) => {
        setLoading(true);
        setError(null);

        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "linkedin-api8.p.rapidapi.com",
            "x-rapidapi-key": "API KEY" // Replace with your actual key
        },
        body: JSON.stringify({
            "keyword": keyword ?? "",
            "sortBy": "date_posted",
            "datePosted": "",
            "page": 1,
            "contentType": "",
            "fromMember": [
            ],
            "fromCompany": [
            ],
            "mentionsMember": [
            ],
            "mentionsOrganization": [
            ],
            "authorIndustry": [
            ],
            "authorCompany": [
            ],
            "authorTitle": ""
            })
        };

        try {
            const response = await fetch(
               "https://linkedin-api8.p.rapidapi.com/search-posts",
               options
            );
            if (!response?.ok) {
                throw new Error(`HTTP error: ${response?.status}`);
            }
            const responseJson = await response?.json();
            //const responseJson = keyword ? searchAPIResponse : apiResponseSample;
            setPosts(responseJson?.data?.items || []);
        } catch (err) {
            setError("Failed to fetch posts.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    

    return {
        posts,
        setPosts,
        fetchPosts,
        loading,
        setLoading,
        error,
        setError,
    };
};