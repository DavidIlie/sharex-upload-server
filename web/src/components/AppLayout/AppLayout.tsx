import Footer from "@components/Footer";
import ThemeSwitcher from "@components/ThemeSwitcher";

interface LayoutProps {
    children: React.ReactElement;
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <>
            <div className="flex flex-col justify-between min-h-screen text-white bg-gray-100 dark:bg-gray-900">
                <ThemeSwitcher />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default AppLayout;
