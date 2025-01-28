import { create } from "zustand";

interface Location {
    placeId: string;
    description: string;
}

interface User {
    displayName: string;
    fid: number;
    location: Location;
    pfpUrl: string;
    username: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useFrameStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null })
}))

