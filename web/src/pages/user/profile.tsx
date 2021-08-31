import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { isLoggedIn } from "@lib/isLoggedIn";

import NavBar from "@components/NavBar";

import ProfileInformationModule from "@modules/user/profile/profile-information";

const ProfilePage = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Profile" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <ProfileInformationModule />
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

export default ProfilePage;
