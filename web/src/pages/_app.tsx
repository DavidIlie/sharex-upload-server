import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";

import "tailwindcss/tailwind.css";
import "../styles/global.css";

import Loader from "@components/Loader";
import AppLayout from "@components/AppLayout";

function App({ Component, pageProps, router }: AppProps) {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        document.documentElement.lang = `en-US`;
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        router.events.on(`routeChangeStart`, start);
        router.events.on(`routeChangeComplete`, end);
        router.events.on(`routeChangeError`, end);
        return () => {
            router.events.off(`routeChangeStart`, start);
            router.events.off(`routeChangeComplete`, end);
            router.events.off(`routeChangeError`, end);
        };
    });

    return (
        <>
            <DefaultSeo
                defaultTitle="ShareX Media Server"
                titleTemplate="%s | ShareX Media Server"
                openGraph={{
                    title: `ShareX Media Server`,
                    type: `website`,
                    site_name: `ShareX Media Server`,
                }}
                description="Advanced ShareX media server with support for most types of uploads and a web interface."
            />
            <AppLayout>
                {loading ? <Loader /> : <Component {...pageProps} />}
            </AppLayout>
        </>
    );
}

export default App;
