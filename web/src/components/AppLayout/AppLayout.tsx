import { useShortcut } from "litkey";
import { useState, useEffect } from "react";

import ToggleColorMode from "@hooks/ToggleColorMode";

import { UpDown } from "@components/Animations/Animation";
import SVG from "@components/SVG";

import Footer from "@components/Footer";
import ThemeSwitcher from "@components/ThemeSwitcher";
import DevelopmentModeAlertModule from "@modules/misc/DevelopmentModeAlert";

interface LayoutProps {
    children: React.ReactElement;
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
    const [dissmissDevAlert, setDissmissDevAlert] = useState<any>(false);

    useEffect(() => {
        setDissmissDevAlert(
            localStorage.getItem("dismissDevelopmentAlert") || false
        );
    }, []);

    const changeTheme = ToggleColorMode();
    useShortcut("ctrl+shift+e", () => changeTheme());

    return (
        <>
            {dissmissDevAlert !== "true" && <DevelopmentModeAlertModule />}
            <UpDown type="normal">
                <SVG icon="triangle" width={48} stroke left="10%" top="20%" />
                <SVG icon="hexa" width={48} stroke left="60%" top="70%" />
                <SVG icon="box" width={6} left="60%" top="15%" />
            </UpDown>
            <UpDown type="wide">
                <SVG icon="triangle" width={24} stroke left="65%" top="8%" />
                <SVG icon="triangle" width={12} stroke left="90%" top="50%" />
                <SVG icon="triangle" width={16} stroke left="30%" top="65%" />
            </UpDown>
            <UpDown type="slow">
                <SVG
                    icon="circle"
                    width={20}
                    hiddenMobile
                    left="85%"
                    top="25%"
                />
                <SVG
                    icon="circle"
                    hiddenMobile
                    stroke
                    width={24}
                    left="5%"
                    top="70%"
                />
                <SVG icon="circle" width={6} left="4%" top="20%" />
                <SVG
                    icon="circle"
                    width={12}
                    left="50%"
                    top="60%"
                    color="gray.100"
                />
            </UpDown>
            <div className="flex flex-col justify-between min-h-screen text-black dark:text-white pageBackground backdrop-filter backdrop-blur-sm dark:backdrop-blur-lg">
                <ThemeSwitcher />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default AppLayout;
