import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { isLoggedIn } from "@lib/isLoggedIn";

import NavBar from "@components/NavBar";
import GeneralSettingsModule from "@modules/control-panel/general-settings";

const ControlPanel = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Control Panel" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <GeneralSettingsModule />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    await isLoggedIn(req, res);
    return {
        props: {},
    };
};

export default ControlPanel;
