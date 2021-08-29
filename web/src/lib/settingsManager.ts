export const getSettingsData = async () => {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`, {
        credentials: "include",
    });
    const response = await r.json();

    return response;
};
