import toast from "react-hot-toast";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";

const DeleteAccountModule = (): JSX.Element => {
    return (
        <SettingSection
            title="Delete Account"
            subtitle="Permanently delete your account."
        >
            <TopPart noGrid noBottom>
                <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-dark-gray-100">
                    <p>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                    </p>

                    <button
                        type="button"
                        className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-600 transition ease-in-out duration-150"
                        onClick={() => toast("coming soon!", { icon: "💻" })}
                    >
                        Delete Account
                    </button>
                </div>
            </TopPart>
        </SettingSection>
    );
};

export default DeleteAccountModule;
