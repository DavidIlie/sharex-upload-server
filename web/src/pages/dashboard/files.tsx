import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import { Fade } from "react-awesome-reveal";

import type { FileType } from "@sharex-server/common";
import { isLoggedIn } from "@lib/isLoggedIn";

import NavBar from "@components/NavBar";
import LargePreviewListPane from "@components/LargePreviewListPane";

const Images = (): JSX.Element => {
    const { data, isLoading } = useQuery<FileType[]>(
        "/api/latest/files/no-limit"
    );

    if (isLoading) return <div />;

    return (
        <>
            <NextSeo title="Files" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <Fade direction="up" triggerOnce>
                    <LargePreviewListPane type="file" data={data} />
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

export default Images;
