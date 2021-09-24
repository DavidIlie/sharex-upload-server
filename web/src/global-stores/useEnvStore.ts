import create from "zustand";

export type ENV = {
    api_url: string;
    app_url: string;
};

type Store = {
    env: ENV;
    updateEnv: (env: ENV) => void;
};

export const useEnvStore = create<Store>((set) => ({
    env: {} as ENV,
    updateEnv(env: ENV) {
        set((state) => ({
            ...state,
            env: env,
        }));
    },
}));
