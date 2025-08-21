import { create } from "zustand";
import dummy from '@/data/dummy.json'
import { Data } from "@/utils/CommonData";

interface DataStore {
    isScrolled: boolean;
    setIsScrolled: (isScrolled: boolean) => void;
    allAsset: Data[] 
}

export const useDataStore = create<DataStore>((set) => ({
    isScrolled: false,
    setIsScrolled: (isScrolled: boolean) => set({ isScrolled }),
    allAsset: [], 
}));