import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { SettingsType } from "@sharex-server/common";
import { loginCheckAndUser } from "@lib/loginCheckAndUser";

import type User from "../types/User";
import NavBar from "@components/NavBar";

interface DashboardProps {
    settings: SettingsType;
    user: User;
}

const Dashboard = ({ settings, user }: DashboardProps): JSX.Element => {
    console.log(settings);
    console.log(user);
    return (
        <>
            <NextSeo title="Dashboard" />
            <div className="h-screen">
                <NavBar user={user} settings={settings} />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const user = await loginCheckAndUser(req, res);
    return {
        props: user,
    };
};

export default Dashboard;
