export const isLoggedIn = async (cookie: string) => {
    const request = await fetch(`${process.env.API_URL}/api/user/auth`, {
        credentials: "include",
        headers: {
            access_token: cookie,
        },
    });
    if (request.status === 200) return true;
    return false;
};
