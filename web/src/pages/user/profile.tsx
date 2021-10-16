import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { isLoggedIn } from "@lib/isLoggedIn";

import NavBar from "@components/NavBar";

import ProfileInformationModule from "@modules/user/profile/profile-information";
import ChangePasswordModule from "@modules/user/profile/change-password";
import SiteThemeModule from "@modules/user/profile/site-theme";
import DeleteAccountModule from "@modules/user/profile/delete-account";

const ProfilePage = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Profile" />
            <div className="mb-12">
                <NavBar />
                <Fade triggerOnce direction="up">
                    <div className="pt-12">
                        <ProfileInformationModule />
                    </div>
                    <div className="pt-12">
                        <ChangePasswordModule />
                    </div>
                    <div className="pt-12">
                        <SiteThemeModule />
                    </div>
                    <div className="pt-12">
                        <DeleteAccountModule />
                    </div>
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

export default ProfilePage;
