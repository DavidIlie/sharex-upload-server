import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import { QueryClientProvider } from "react-query";

import "tailwindcss/tailwind.css";
import "../styles/global.css";

import Loader from "@components/Loader";
import AppLayout from "@components/AppLayout";

import { queryClient } from "@lib/queryClient";
import { useSettingsStore } from "@global-stores/useSettingsStore";
import { getSettingsData } from "@lib/settingsManager";

function App({ Component, pageProps, router }: AppProps) {
    const [finishedSettingsCheck, setFinishedSettingsCheck] =
        useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const { settings, updateSettings } = useSettingsStore((s) => s);

    useEffect(() => {
        if (performance.navigation.type != 1)
            if (settings.name) return setFinishedSettingsCheck(true);
        const getData = async () => {
            const settings = await getSettingsData();
            updateSettings(settings);
            setFinishedSettingsCheck(true);
        };
        getData();
    }, []);

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

    if (!finishedSettingsCheck) {
        return null;
    }

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
                    {loading ? <Loader /> : <Component {...pageProps} />}
                </AppLayout>
            </QueryClientProvider>
        </>
    );
}

export default App;
