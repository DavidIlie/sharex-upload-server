import { useQuery } from "react-query";

import APIKeyCard from "@components/APIKeyCard";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

interface TokenProps {
    creator: string;
    permissions: Array<string>;
    name: string;
}

const ManageTokensModule = (): JSX.Element => {
    const { isLoading, data } = useQuery<TokenProps[]>("/api/keys");

    return (
        <SettingSection
            title="Manage API Keys"
            subtitle="You may delete any of your existing tokens if they are no longer needed."
        >
            <TopPart>
                {!isLoading && (
                    <div className="col-span-6 sm:col-span-4">
                        {data?.length === 0 ? (
                            <h1>You don't have any API Tokens right now.</h1>
                        ) : (
                            data?.map((key, index) => (
                                <APIKeyCard data={key} key={index} />
                            ))
                        )}
                    </div>
                )}
            </TopPart>
            <BottomPart>
                <SaveButton isSubmitting={false} />
            </BottomPart>
        </SettingSection>
    );
};

export default ManageTokensModule;
