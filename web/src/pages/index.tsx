import { GetServerSideProps } from "next";
import type { SettingsType } from "@sharex-server/common";

interface HomeProps {
    settings: SettingsType;
}

const Home = ({ settings }: HomeProps): JSX.Element => {
    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-5xl text-white text-semibold">
                {settings.name}
            </h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();

    return { props: {} };
};

export default Home;
