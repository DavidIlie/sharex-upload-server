export const getUserData = async () => {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        credentials: "include",
    });
    const response = await r.json();

    return response;
};
