import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { isLoggedIn } from "@lib/isLoggedIn";

import NavBar from "@components/NavBar";

import CreateTokenModule from "@modules/user/api-keys/create-key";
import ManageKeysModule from "@modules/user/api-keys/manage-key";

const APIKeysPage = (): JSX.Element => {
    return (
        <>
            <NextSeo title="API Keys" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <CreateTokenModule />
                <div className="pt-12" />
                <ManageKeysModule />
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

export default APIKeysPage;
