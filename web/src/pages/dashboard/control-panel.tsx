import React from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { isLoggedIn } from "@lib/isLoggedIn";
import useUser from "@hooks/useUser";

import NavBar from "@components/NavBar";
import GeneralSettingsModule from "@modules/dashboard/control-panel/general-settings";

const ControlPanel: React.FC = () => {
    const user = useUser();
    const router = useRouter();

    if (user.isAdmin) {
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
