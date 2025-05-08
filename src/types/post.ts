export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface PostsContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
}