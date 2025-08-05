// /store/useDataStore.ts
import { Post } from "@/utils/CommonData";
import { create } from "zustand";


interface DataStore {
    posts: Post[];
    setPosts: (posts: Post[]) => void; 
    selectedPost: Post | null;
    setSelectedPost: (post: Post | null)=>void;
}

export const useDataStore = create<DataStore>((set) => ({
    posts: [],
    setPosts: (posts:Post[])=>set({posts}),
    selectedPost: null,
    setSelectedPost: (selectedPost:Post|null)=>set({selectedPost}),
}));
