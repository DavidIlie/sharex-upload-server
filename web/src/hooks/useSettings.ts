import { SettingsType } from "@sharex-server/common";

export default function useSettings() {
    const settings = localStorage.getItem("app_settings") || {
        name: "ShareX Media Server",
    };

    //@ts-ignore
    return JSON.parse(settings) as SettingsType;
}
