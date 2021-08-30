import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { loginCheckAndGetUser } from "@lib/loginCheckAndGetUser";
import type User from "../../types/User";
import { is_dev } from "@lib/constants";

import NavBar from "@components/NavBar";
import AlertBanner from "@components/AlertBanner";

import StatisticsModule from "@modules/dashboard/statistics";
import LatestImagesModule from "@modules/dashboard/previews/image";
import LatestFilesModule from "@modules/dashboard/previews/file";
import LatestTextsModule from "@modules/dashboard/previews/text";

const Dashboard = ({ user }: { user: User }): JSX.Element => {
    return (
        <>
            <NextSeo title="Dashboard" />
            {is_dev && (
                <AlertBanner
                    storageName="dismissDevelopmentAlert"
                    color="red"
                    title="App is in development mode!"
                    message="Hope you know what you are doing!"
                />
            )}
            <div className="mb-12">
                <NavBar user={user} />
                <div className="pt-12" />

                <Fade direction="up" triggerOnce>
                    <StatisticsModule />
                </Fade>

                <div className="pt-12" />

                <Fade direction="up" triggerOnce>
                    <LatestImagesModule />
                </Fade>

                <div className="pt-12" />

                <Fade direction="up" triggerOnce>
                    <LatestFilesModule />
                </Fade>

                <div className="pt-12" />

                <Fade direction="up" triggerOnce>
                    <LatestTextsModule />
                </Fade>
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
