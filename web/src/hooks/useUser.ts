import { useState, useEffect } from "react";

import User from "types/User";

const fetchUser = async () => {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        credentials: "include",
    });
    return await r.json();
};

export default function useUser() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    const refetchUser = async () => {
        setLoading(true);
        setUser(await fetchUser());
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setUser(await fetchUser());
            setLoading(false);
        };
        fetchData();
    }, []);

    return { isLoading, user, refetchUser };
}
