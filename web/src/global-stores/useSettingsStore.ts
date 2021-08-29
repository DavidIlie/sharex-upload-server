import create from "zustand";
import { SettingsType } from "@sharex-server/common";
import { getSettingsData } from "@lib/settingsManager";

type Store = {
    update: () => void;
    settings: SettingsType;
    updateSettings: (settings: SettingsType) => void;
};

export const useSettingsStore = create<Store>((set) => ({
    update: async () => {
        const settings = await getSettingsData();
        set({ settings });
    },
    settings: {} as SettingsType,
    updateSettings(settings: SettingsType) {
        set((state) => ({
            ...state,
            settings: settings,
        }));
    },
}));
