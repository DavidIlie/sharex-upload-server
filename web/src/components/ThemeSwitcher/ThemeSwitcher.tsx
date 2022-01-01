import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import ToggleColorMode from "@hooks/ToggleColorMode";

const ThemeSwitcher = (): JSX.Element => {
    const [mounted, setMounted] = useState<boolean>(false);
    const { resolvedTheme } = useTheme();
    const updateTheme = ToggleColorMode();
    const router = useRouter();

    useEffect(() => setMounted(true), []);

    const path = router.pathname;
    if (path.startsWith("/dashboard") || path.startsWith("/user"))
        return <div className="hidden" />;

    return (
        <div className="absolute top-0 right-0 z-10 p-5 mr-5">
            {mounted && (
                <DarkModeSwitch
                    checked={resolvedTheme === "dark"}
                    onChange={updateTheme}
                />
            )}
        </div>
    );
};

export default ThemeSwitcher;
