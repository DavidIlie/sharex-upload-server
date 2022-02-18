import create from "zustand";

type Store = {
    isPrivacyEnabled: boolean | null;
    updatePrivacyModeState: (isPrivacyEnabled: boolean) => void;
};

export const usePrivacyStore = create<Store>((set) => ({
    isPrivacyEnabled: null,
    updatePrivacyModeState(isPrivacyEnabled: boolean) {
        set((state) => ({
            ...state,
            isPrivacyEnabled: isPrivacyEnabled,
        }));
    },
}));
