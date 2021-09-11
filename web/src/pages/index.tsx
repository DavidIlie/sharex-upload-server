import { GetServerSideProps } from "next";

import useSettings from "@hooks/useSettings";
import { isLoggedIn } from "@lib/isLoggedIn";

const Home = (): JSX.Element => {
    const settings = useSettings();

    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-5xl text-white text-semibold">
                {settings.name}
            </h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
    const loggedIn = await isLoggedIn(req, res);

    if (loggedIn) {
        res.setHeader("location", "/dashboard");
        res.statusCode = 302;
        res.end();
    } else {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
    }

    return {
        props: {},
    };
};

export default Home;
