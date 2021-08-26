import { isLoggedIn } from "./isLoggedIn";

export const loginCheckAndGetUser = async (req: any, res: any) => {
    const cookie = req.cookies.access;

    const loggedIn = await isLoggedIn(cookie);

    if (!loggedIn) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
    }

    const userRequest = await fetch(`${process.env.API_URL}/api/user`, {
        headers: {
            access_token: cookie,
        },
    });
    const userResponse = await userRequest.json();
    return {
        user: userResponse,
    };
};
