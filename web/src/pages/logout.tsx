import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { isLoggedIn } from "@lib/isLoggedIn";

import Loader from "@components/Loader";

const Logout = (): JSX.Element => {
    const router = useRouter();
    const [_cookies, _setCookie, removeCookie] = useCookies();

    useEffect(() => {
        removeCookie("access");
        router.push("/");
    }, []);

    return (
        <div className="h-screen flex items-center justify-center">
            <Loader />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const cookie = req.cookies.access;
    const loggedIn = await isLoggedIn(cookie);

    if (!loggedIn) {
        res.setHeader("location", "/");
        res.statusCode = 302;
        res.end();
    }

    return { props: {} };
};

export default Logout;
