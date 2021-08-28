import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { loginCheckAndGetUser } from "@lib/loginCheckAndGetUser";
import type User from "../types/User";

import NavBar from "@components/NavBar";

const ControlPanel = ({ user }: { user: User }): JSX.Element => {
    return (
        <>
            <NextSeo title="Control Panel" />
            <div className="mb-12">
                <NavBar user={user} />
                <div className="pt-12" />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const user = await loginCheckAndGetUser(req, res);
    return {
        props: user,
    };
};

export default ControlPanel;
