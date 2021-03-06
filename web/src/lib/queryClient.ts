import toast from "react-hot-toast";
import { QueryClient } from "react-query";
import { defaultQueryFn } from "./defaultQueryFn";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            onError: (e) => {
                if ("message" in (e as Error)) {
                    const message = (e as Error).message;
                    toast.error(message, { id: "notLoggedIn" });
                    if (message === "not authenticated")
                        window.location.href = "/";
                }
            },
            queryFn: defaultQueryFn as any,
        },
    },
});
