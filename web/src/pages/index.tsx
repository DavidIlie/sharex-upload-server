import { GetServerSideProps } from "next";

import useSettings from "@hooks/useSettings";

const Home = (): JSX.Element => {
    const settings = useSettings();

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-5xl text-white text-semibold">
                {settings.name}
            </h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
    const cookie = req.cookies.access;

    const request = await fetch(`${process.env.SERVER_API_URL}/api/auth`, {
        credentials: "include",
        headers: {
            access_token: cookie,
        },
    });

    if (request.status === 200) {
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
