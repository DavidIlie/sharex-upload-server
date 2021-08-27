export const checkIfSettingsArePresent = () => {
    const settings = localStorage.getItem("app_settings");
    if (settings) return true;
    return false;
};

export const getDataAndUpdateLocalStorage = async () => {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`);
    const response = await r.json();

    localStorage.setItem("app_settings", JSON.stringify(response));
};
