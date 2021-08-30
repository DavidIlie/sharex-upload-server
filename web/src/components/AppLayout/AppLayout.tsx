import AlertBanner from "@components/AlertBanner";
import Footer from "@components/Footer";
import { useRouter } from "next/router";

import { is_dev } from "@lib/constants";

import ThemeSwitcher from "@components/ThemeSwitcher";

interface LayoutProps {
    children: React.ReactElement;
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
    const router = useRouter();
    const path = router.pathname;
    return (
        <>
            {is_dev && path.startsWith("/dashboard" || "/user") && (
                <AlertBanner
                    storageName="dismissDevelopmentAlert"
                    color="red"
                    title="App is in development mode!"
                    message="If you don't know what you are doing, please switch to production mode!"
                />
            )}
            <div className="flex flex-col justify-between min-h-screen text-white bg-gray-100 dark:bg-gray-900">
                <ThemeSwitcher />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default AppLayout;
