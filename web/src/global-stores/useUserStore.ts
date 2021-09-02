import create from "zustand";
import type User from "../types/User";

type Store = {
    user: User;
    updateUser: (settings: User) => void;
};

export const useUserStore = create<Store>((set) => ({
    user: {} as User,
    updateUser(user: User) {
        set((state) => ({
            ...state,
            user: user,
        }));
    },
}));
