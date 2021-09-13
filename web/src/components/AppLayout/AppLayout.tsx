import { useShortcut } from "litkey";

import ToggleColorMode from "@hooks/ToggleColorMode";

import Footer from "@components/Footer";
import ThemeSwitcher from "@components/ThemeSwitcher";
import DevelopmentModeAlertModule from "@modules/misc/DevelopmentModeAlert";

interface LayoutProps {
    children: React.ReactElement;
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
    const dissmissDevAlert = localStorage.getItem("dismissDevelopmentAlert");

    const changeTheme = ToggleColorMode();
    useShortcut("shift+d", () => changeTheme());

    return (
        <>
            {dissmissDevAlert !== "true" && <DevelopmentModeAlertModule />}
            <div className="flex flex-col justify-between min-h-screen text-black dark:text-white bg-gray-100 dark:bg-gray-900">
                <ThemeSwitcher />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default AppLayout;
