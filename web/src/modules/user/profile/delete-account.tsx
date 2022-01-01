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
                <div className="max-w-xl mt-3 text-sm text-gray-600 dark:text-dark-gray-100">
                    <p>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                    </p>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-600"
                        onClick={() => toast.error("i forgor", { icon: "💀" })}
                    >
                        Delete Account
                    </button>
                </div>
            </TopPart>
        </SettingSection>
    );
};

export default DeleteAccountModule;
