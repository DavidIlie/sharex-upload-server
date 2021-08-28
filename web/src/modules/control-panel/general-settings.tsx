import useSettings from "@hooks/useSettings";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

const GeneralSettingsModule = (): JSX.Element => {
    const settings = useSettings();

    return (
        <SettingSection
            title="General Site Settings"
            subtitle="Change the general global site settings."
        >
            <TopPart>
                <div className="col-span-6 sm:col-span-4">
                    <label className="block font-medium text-sm text-dark-gray-300">
                        Site Name
                    </label>
                    <input className="text-dark-gray-200 border-dark-gray-600 focus:border-dark-gray-600 focus:ring-dark-gray-800 bg-gray-800 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full py-1.5 px-2" />
                </div>
            </TopPart>
            <BottomPart>
                <SaveButton />
            </BottomPart>
        </SettingSection>
    );
};

export default GeneralSettingsModule;
