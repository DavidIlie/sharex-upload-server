import { GetServerSideProps } from "next";

import { isLoggedIn } from "@lib/isLoggedIn";

const ProfilePage = (): JSX.Element => {
    return <div />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    await isLoggedIn(req, res);
    return {
        props: {},
    };
};

export default ProfilePage;
