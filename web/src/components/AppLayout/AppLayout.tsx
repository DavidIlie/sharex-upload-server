import Footer from "@components/Footer";

interface LayoutProps {
    children: React.ReactElement;
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="flex flex-col justify-between min-h-screen text-white bg-gray-900">
            {children}
            <Footer />
        </div>
    );
};

export default AppLayout;
