import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import { Fade } from "react-awesome-reveal";

import { loginCheckAndGetUser } from "@lib/loginCheckAndGetUser";
import type User from "../../types/User";
import type { FileType } from "@sharex-server/common";

import NavBar from "@components/NavBar";
import LargePreviewListPane from "@components/LargePreviewListPane";

const Images = ({ user }: { user: User }): JSX.Element => {
    const { data, isLoading } = useQuery<FileType[]>(
        "/api/latest/images/no-limit"
    );

    if (isLoading) return <div />;

    return (
        <>
            <NextSeo title="Images" />
            <div className="mb-12">
                <NavBar user={user} />
                <div className="pt-12" />
                <Fade direction="up" triggerOnce>
                    <LargePreviewListPane type="image" data={data} />
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

export default Images;
