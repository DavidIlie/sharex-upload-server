import { useSettingsStore } from "@global-stores/useSettingsStore";
import { SettingsType } from "@sharex-server/common";

export default function useSettings() {
    const settings = useSettingsStore((s) => s.settings);

    //@ts-ignore
    return settings as SettingsType;
}
