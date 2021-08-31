import { GetServerSideProps } from "next";

import User from "../../types/User";
import { loginCheckAndGetUser } from "@lib/loginCheckAndGetUser";

const ProfilePage = ({ user }: { user: User }): JSX.Element => {
    return <div />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const user = await loginCheckAndGetUser(req, res);
    return {
        props: user,
    };
};

export default ProfilePage;
