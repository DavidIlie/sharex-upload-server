import { useEffect, useState } from "react";

export default function usePrivacyMode() {
    const [isPrivacyModeEnabled, setIsEnabled] = useState<boolean | null>(null);

    useEffect(() => {
        const item = localStorage.getItem("PrivacyModeEnabled");
        if (item === "true") return setIsEnabled(true);
        return setIsEnabled(false);
    });

    const updatePrivacyMode = () => {
        localStorage.setItem(
            "PrivacyModeEnabled",
            !isPrivacyModeEnabled ? "true" : "false"
        );
        setIsEnabled(!isPrivacyModeEnabled);
    };

    return { isPrivacyModeEnabled, updatePrivacyMode };
}
