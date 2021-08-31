import create from "zustand";
import type User from "../types/User";
import { getUserData } from "@lib/userManager";

type Store = {
    update: () => void;
    user: User;
    updateUser: (settings: User) => void;
};

export const useUserStore = create<Store>((set) => ({
    update: async () => {
        const user = await getUserData();
        set({ user });
    },
    user: {} as User,
    updateUser(user: User) {
        set((state) => ({
            ...state,
            user: user,
        }));
    },
}));
