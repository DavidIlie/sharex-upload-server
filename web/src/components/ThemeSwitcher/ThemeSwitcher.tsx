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
        <div className="absolute right-0 top-0 p-5 mr-5 z-10">
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
