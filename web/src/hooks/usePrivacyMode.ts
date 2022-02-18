import { useEffect, useState } from "react";

import { usePrivacyStore } from "@global-stores/usePrivacyStore";

export default function usePrivacyMode() {
    const [isPrivacyModeEnabled, setIsEnabled] = useState<boolean | null>(null);
    const { updatePrivacyModeState } = usePrivacyStore();

    useEffect(() => {
        const item = localStorage.getItem("PrivacyModeEnabled");
        if (item === "true") {
            updatePrivacyModeState(true);
            return setIsEnabled(true);
        }
        updatePrivacyModeState(false);
        return setIsEnabled(false);
    }, []);

    const updatePrivacyMode = () => {
        localStorage.setItem(
            "PrivacyModeEnabled",
            !isPrivacyModeEnabled ? "true" : "false"
        );
        updatePrivacyModeState(!isPrivacyModeEnabled ? true : false);
        setIsEnabled(!isPrivacyModeEnabled);
    };

    return { isPrivacyModeEnabled, updatePrivacyMode };
}
