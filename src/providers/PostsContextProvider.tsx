import React, { useState, useCallback, ReactNode, createContext } from 'react';
import axios from 'axios';
import { Post, PostsContextType } from '../types/post';

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
            // console.log(response.data);
        } catch (err) {
            setError(err instanceof Error? err.message : 'An error occurred while fetching posts');
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        posts,
        loading,
        error,
        fetchPosts
    };

    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    );
};

