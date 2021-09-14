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
                <div className="col-span-6 sm:col-span-4">
                    <h1>
                        You don't have any API Keys right now, add one and then
                        come back!
                    </h1>
                </div>
            </TopPart>
            <BottomPart>
                <SaveButton isSubmitting={false} />
            </BottomPart>
        </SettingSection>
    );
};

export default ManageTokensModule;
