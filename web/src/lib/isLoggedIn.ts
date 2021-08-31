export const noRedirectIsLoggedIn = async (cookie: string) => {
    if (cookie) {
        const request = await fetch(`${process.env.API_URL}/api/user/auth`, {
            credentials: "include",
            headers: {
                access_token: cookie,
            },
        });
        if (request.status === 200) return true;
    }
    return false;
};

export const isLoggedIn = async (req: any, res: any) => {
    const cookie = req.cookies.access;

    if (cookie) {
        const request = await fetch(`${process.env.API_URL}/api/user/auth`, {
            credentials: "include",
            headers: {
                access_token: cookie,
            },
        });
        if (request.status === 200) return true;
    } else {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        return res.end();
    }
};
