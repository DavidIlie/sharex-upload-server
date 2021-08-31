import toast from "react-hot-toast";
import { QueryClient } from "react-query";
import { defaultQueryFn } from "./defaultQueryFn";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            onError: (e) => {
                if ("message" in (e as Error)) {
                    toast.error((e as Error).message);
                }
            },
            queryFn: defaultQueryFn as any,
        },
    },
});
