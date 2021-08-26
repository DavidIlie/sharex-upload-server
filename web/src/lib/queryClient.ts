import { QueryClient } from "react-query";
import { defaultQueryFn } from "./defaultQueryFn";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            onError: (e) => {
                if ("message" in (e as Error)) {
                    console.log(e as Error);
                }
            },
            queryFn: defaultQueryFn as any,
        },
    },
});
