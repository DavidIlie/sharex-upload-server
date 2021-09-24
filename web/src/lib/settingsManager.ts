import { ENV } from "@global-stores/useEnvStore";

export const getSettingsData = async (env: ENV) => {
    const r = await fetch(`${env.api_url}/api/settings`, {
        credentials: "include",
    });
    const response = await r.json();

    return response;
};
