import Footer from "@components/Footer";

interface LayoutProps {
    children: React.ReactElement;
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="text-white">
            <div className="bg-gray-900">{children}</div>
            <Footer />
        </div>
    );
};

export default AppLayout;
