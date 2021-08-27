import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { loginCheckAndGetUser } from "@lib/loginCheckAndGetUser";

import NavBar from "@components/NavBar";
import { StatisticsModule } from "modules/dashboard/statistics";

import type User from "../types/User";
import LatestImagesModule from "modules/dashboard/previews/image";
import LatestFilesModule from "modules/dashboard/previews/file";
import LatestTextsModule from "modules/dashboard/previews/text";

interface DashboardProps {
    user: User;
}

const Dashboard = ({ user }: DashboardProps): JSX.Element => {
    return (
        <>
            <NextSeo title="Dashboard" />
            <div className="mb-12">
                <NavBar user={user} />
                <div className="pt-12" />
                <StatisticsModule />
                <div className="pt-12" />
                <LatestImagesModule />
                <div className="pt-12" />
                <LatestFilesModule />
                <div className="pt-12" />
                <LatestTextsModule />
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
