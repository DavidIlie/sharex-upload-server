import { ENV } from "@global-stores/useEnvStore";

export const getUserData = async (env: ENV) => {
    const r = await fetch(`${env.api_url}/api/user`, {
        credentials: "include",
    });
    const response = await r.json();

    return response;
};
