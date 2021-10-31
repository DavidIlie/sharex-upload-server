import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

import { queryClient } from "@lib/queryClient";
import { useSettingsStore } from "@global-stores/useSettingsStore";
import { getSettingsData } from "@lib/settingsManager";
import { useUserStore } from "@global-stores/useUserStore";
import { getUserData } from "@lib/userManager";
import { useEnvStore, ENV } from "@global-stores/useEnvStore";

import Loader from "@components/Loader";
import AppLayout from "@components/AppLayout";

type Props = { env: ENV } & AppProps;

function App({ Component, pageProps, router, env }: Props) {
    const [finishedSettingsCheck, setFinishedSettingsCheck] =
        useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const { settings, updateSettings } = useSettingsStore((s) => s);
    const { user, updateUser } = useUserStore();
    const { updateEnv } = useEnvStore();

    useEffect(() => {
        updateEnv(env);

        if (performance.navigation.type != 1) {
            if (settings.name && user.name)
                return setFinishedSettingsCheck(true);
        }
        const getData = async () => {
            const settings = await getSettingsData(env);
            updateSettings(settings);

            if (router.asPath !== "/login" && router.asPath !== "/logout") {
                const user = await getUserData(env);
                updateUser(user);
            }

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

    return (
        <>
            <DefaultSeo
                defaultTitle={settings.name || env.default_app_name}
                titleTemplate={`%s | ${settings.name || env.default_app_name}`}
                openGraph={{
                    title: settings.name || env.default_app_name,
                    type: `website`,
                    site_name: settings.name || env.default_app_name,
                }}
                description="Advanced ShareX Upload Server with support for most types of uploads and a web interface."
            />
            <ThemeProvider
                attribute="class"
                defaultTheme={settings.default_theme}
            >
                <QueryClientProvider client={queryClient}>
                    <Toaster position="top-center" />
                    {router.asPath.includes("/f/") ||
                    router.asPath.includes("/t/") ? (
                        <AppLayout>
                            <Component {...pageProps} />
                        </AppLayout>
                    ) : !finishedSettingsCheck ||
                      (!finishedSettingsCheck && loading) ||
                      loading ? (
                        <Loader />
                    ) : (
                        <AppLayout>
                            <Component {...pageProps} />
                        </AppLayout>
                    )}
                </QueryClientProvider>
            </ThemeProvider>
        </>
    );
}

App.getInitialProps = async () => {
    const env = {
        api_url: process.env.API_URL,
        app_url: process.env.APP_URL,
        default_app_name:
            process.env.DEFAULT_APP_NAME || "ShareX Upload Server",
    };

    return { env };
};

export default App;
