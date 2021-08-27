import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import { QueryClientProvider } from "react-query";
import type { SettingsType } from "@sharex-server/common";

import {
    checkIfSettingsArePresent,
    getDataAndUpdateLocalStorage,
} from "@lib/settingsManager";
import useSettings from "@hooks/useSettings";

import "tailwindcss/tailwind.css";
import "../styles/global.css";

import Loader from "@components/Loader";
import AppLayout from "@components/AppLayout";
import { queryClient } from "@lib/queryClient";

type ApplicationProps = AppProps & {
    settings: SettingsType;
};

function App({ Component, pageProps, router }: ApplicationProps) {
    const [finishedSettingsCheck, setFinishedSettingsCheck] =
        useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const settingsPreset = checkIfSettingsArePresent();
        if (performance.navigation.type != 1)
            if (settingsPreset) return setFinishedSettingsCheck(true);
        const getData = async () => {
            await getDataAndUpdateLocalStorage();
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

    const settings = useSettings();

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
