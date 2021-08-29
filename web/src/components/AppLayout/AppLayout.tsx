import AlertBanner from "@components/AlertBanner";
import Footer from "@components/Footer";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { is_dev } from "@lib/constants";

interface LayoutProps {
    children: React.ReactElement;
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <>
            {is_dev && (
                <AlertBanner
                    storageName="dismissDevelopmentAlert"
                    color="red"
                    title="App is in development mode!"
                    message="Hope you know what you are doing!"
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
