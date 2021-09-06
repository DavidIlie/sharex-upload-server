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
                <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-dark-gray-100">
                    <p>
                        You're currently viewing the site in {theme} mode, you
                        can use the button below to change your prefered site
                        theme. You can also change the theme from the dropdown
                        on the navigation bar.
                    </p>

                    <button
                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-dark-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 mt-4"
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
