import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { isLoggedIn } from "@lib/isLoggedIn";

import NavBar from "@components/NavBar";

import ProfileInformationModule from "@modules/user/profile/profile-information";
import ChangePasswordModule from "@modules/user/profile/change-password";
import SiteThemeModule from "@modules/user/profile/site-theme";

const ProfilePage = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Profile" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <ProfileInformationModule />
                <div className="pt-12" />
                <ChangePasswordModule />
                <div className="pt-12" />
                <SiteThemeModule />
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
