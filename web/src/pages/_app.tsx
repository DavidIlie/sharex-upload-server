import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import { QueryClientProvider } from "react-query";
import type { SettingsType } from "@sharex-server/common";

import "tailwindcss/tailwind.css";
import "../styles/global.css";

import Loader from "@components/Loader";
import AppLayout from "@components/AppLayout";
import { queryClient } from "@lib/queryClient";

type ApplicationProps = AppProps & {
    settings: SettingsType;
};

function App({ Component, pageProps, router, settings }: ApplicationProps) {
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
                defaultTitle={settings.name}
                titleTemplate={`%s | ${settings.name}`}
                openGraph={{
                    title: settings.name,
                    type: `website`,
                    site_name: settings.name,
                }}
                description="Advanced ShareX Media Server with support for most types of uploads and a web interface."
            />
            <QueryClientProvider client={queryClient}>
                <AppLayout>
                    {loading ? (
                        <Loader />
                    ) : (
                        //TODO: find a way to make this global
                        <Component {...pageProps} settings={settings} />
                    )}
                </AppLayout>
            </QueryClientProvider>
        </>
    );
}

App.getInitialProps = async () => {
    const settingsRequest = await fetch(`${process.env.API_URL}/api/settings`);
    const settingsResponse = await settingsRequest.json();

    return { settings: settingsResponse };
};

export default App;
