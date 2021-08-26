import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { SettingsType } from "@sharex-server/common";
import { loginCheckAndGetUser } from "@lib/loginCheckAndGetUser";

import NavBar from "@components/NavBar";
import { StatisticsModule } from "modules/dashboard/statistics";

import type User from "../types/User";

interface DashboardProps {
    settings: SettingsType;
    user: User;
}

const Dashboard = ({ settings, user }: DashboardProps): JSX.Element => {
    return (
        <>
            <NextSeo title="Dashboard" />
            <div className="h-screen">
                <NavBar user={user} settings={settings} />
                <div className="pt-12" />
                <StatisticsModule />
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

export default Dashboard;
