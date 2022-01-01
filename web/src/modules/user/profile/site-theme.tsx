import { useTheme } from "next-themes";

import ToggleColorMode from "@hooks/ToggleColorMode";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";

const SiteThemeModule = (): JSX.Element => {
    const { theme } = useTheme();
    const updateTheme = ToggleColorMode();

    return (
        <SettingSection
            title="Site Theme Preferences"
            subtitle="Change the look of the site when you're logged in."
        >
            <TopPart noGrid noBottom>
                <div className="max-w-xl mt-3 text-sm text-gray-600 dark:text-dark-gray-100">
                    <p>
                        You're currently viewing the site in {theme} mode, you
                        can use the button below to change your prefered site
                        theme. You can also change the theme from the dropdown
                        on the navigation bar.
                    </p>

                    <button
                        className="inline-flex items-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md dark:bg-dark-gray-600 hover:bg-gray-700 dark:hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25"
                        onClick={() => updateTheme()}
                    >
                        Change to {theme} theme
                    </button>
                </div>
            </TopPart>
        </SettingSection>
    );
};

export default SiteThemeModule;
