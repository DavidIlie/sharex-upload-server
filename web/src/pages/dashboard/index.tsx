import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { isLoggedIn } from "@lib/isLoggedIn";

import NavBar from "@components/NavBar";

import StatisticsModule from "@modules/dashboard/statistics";
import LatestImagesModule from "@modules/dashboard/previews/image";
import LatestFilesModule from "@modules/dashboard/previews/file";
import LatestTextsModule from "@modules/dashboard/previews/text";

const Dashboard = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Dashboard" />
            <div className="mb-12">
                <NavBar />
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
    await isLoggedIn(req, res);
    return {
        props: {},
    };
};

export default Dashboard;
