import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Tab } from "@headlessui/react";
import { Fade } from "react-awesome-reveal";

import { isLoggedIn } from "@lib/isLoggedIn";
import useUser from "@hooks/useUser";

import NavBar from "@components/NavBar";
import GeneralSettingsModule from "@modules/dashboard/control-panel/general-settings";
import StatisticsModule from "@modules/dashboard/statistics";

import FilesSettingsModule from "@modules/dashboard/control-panel/media-settings/files";
import ImagesSettingsModule from "@modules/dashboard/control-panel/media-settings/images";
import TextsSettingsModule from "@modules/dashboard/control-panel/media-settings/texts";

const ControlPanel: React.FC = () => {
    const user = useUser();
    const router = useRouter();

    const DefaultTabClassName =
        "px-3 py-1.5 mx-2 rounded text-sm cursor-pointer text-white";

    const SelectionTabClassName = (selected: boolean) =>
        selected
            ? "bg-gray-700 dark:bg-gray-800"
            : "bg-gray-800 dark:bg-dark-gray-800 hover:bg-gray-500 dark:hover:bg-dark-gray-600";

    const cms = (selected: boolean) =>
        `${DefaultTabClassName} ${SelectionTabClassName(selected)}`;

    if (user.isAdmin) {
        return (
            <>
                <NextSeo title="Control Panel" />
                <div className="mb-12">
                    <NavBar />
                    <Fade triggerOnce direction="up">
                        <div className="pt-12">
                            <StatisticsModule admin={true} />
                        </div>
                        <div className="pt-12">
                            <GeneralSettingsModule />
                        </div>
                        <div className="py-12">
                            <div className="font-semibold text-center text-gray-100">
                                <h4 className="text-xl font-medium text-gray-900 dark:text-dark-gray-100">
                                    Media Settings Type
                                </h4>
                                <p className="pb-4 mt-1 text-gray-600 dark:text-dark-gray-400">
                                    Select the type of media resource you want
                                    the change the settings for.
                                </p>
                            </div>
                            <Tab.Group>
                                <Tab.List className="flex justify-center">
                                    {/* prettier-ignore */}
                                    <Tab className={({ selected }) => cms(selected)}>
                                    Images
                                </Tab>
                                    {/* prettier-ignore */}
                                    <Tab className={({ selected }) => cms(selected)}>
                                    Files
                                </Tab>
                                    {/* prettier-ignore */}
                                    <Tab className={({ selected }) => cms(selected)}>
                                    Texts
                                </Tab>
                                </Tab.List>
                                <Tab.Panels className="px-2 mt-5">
                                    <Tab.Panel>
                                        <ImagesSettingsModule />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <FilesSettingsModule />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <TextsSettingsModule />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </Fade>
                </div>
            </>
        );
    } else {
        toast.error("You are not an admin!");
        router.push("/dashboard");
        return null;
    }
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    await isLoggedIn(req, res);

    return {
        props: {},
    };
};

export default ControlPanel;
