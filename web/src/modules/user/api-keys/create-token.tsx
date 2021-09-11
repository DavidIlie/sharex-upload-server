import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

const CreateTokenModule = (): JSX.Element => {
    return (
        <SettingSection
            title="Create API Key"
            subtitle="API keys allow third-party services to authenticate with this application on your behalf."
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

export default CreateTokenModule;
