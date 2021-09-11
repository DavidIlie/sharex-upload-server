import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

const ManageTokensModule = (): JSX.Element => {
    return (
        <SettingSection
            title="Manage API Keys"
            subtitle="You may delete any of your existing tokens if they are no longer needed."
        >
            <TopPart>
                <h1>yo</h1>
            </TopPart>
            <BottomPart>
                <SaveButton isSubmitting={false} />
            </BottomPart>
        </SettingSection>
    );
};

export default ManageTokensModule;
