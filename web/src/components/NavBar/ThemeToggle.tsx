import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "next-themes";
import ToggleColorMode from "@hooks/ToggleColorMode";

const ThemeToggle = (): JSX.Element => {
    const { theme } = useTheme();
    const changeTheme = ToggleColorMode();

    return (
        <button
            className="group flex gap-1 rounded-b-md items-center w-full"
            aria-label={
                theme === "dark"
                    ? "Toggle Light Mode (shift+d)"
                    : "Toggle Dark Mode (shift+d)"
            }
            title={
                theme === "dark"
                    ? "Toggle Light Mode (shift+d)"
                    : "Toggle Dark Mode (shift+d)"
            }
            onClick={() => changeTheme()}
        >
            {theme === "dark" ? (
                <HiSun className="text-2xl" />
            ) : (
                <HiMoon className="text-2xl" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
};

export default ThemeToggle;
