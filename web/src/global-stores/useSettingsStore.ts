import create from "zustand";
import { SettingsType } from "@sharex-server/common";

type Store = {
    settings: SettingsType;
    updateSettings: (settings: SettingsType) => void;
};

export const useSettingsStore = create<Store>((set) => ({
    settings: {} as SettingsType,
    updateSettings(settings: SettingsType) {
        set((state) => ({
            ...state,
            settings: settings,
        }));
    },
}));
