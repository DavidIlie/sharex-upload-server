import { GetServerSideProps } from "next";
interface Props {
    message?: string;
    stats: {
        size: string;
        extension: string;
        fileName: string;
        md5: string;
        sha1: string;
    };
}

const ViewFile = ({ message, stats }: Props): JSX.Element => {
    if (message)
        return (
            <div className="text-white bg-gray-800 h-screen flex items-center justify-center">
                <h1 className="text-4xl">{message}</h1>
            </div>
        );

    return (
        <div className="text-white bg-gray-800 h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-4">
                <h1>{stats.fileName}</h1>
                <h1>{stats.size}</h1>
                <h1>MD5: {stats.md5}</h1>
                <h1>SHA1: {stats.sha1}</h1>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = await fetch(`http://localhost:4000/api/file/${params?.slug}`);
    const response = await data.json();

    if (response.message) {
        return { props: { message: response.message } };
    } else {
        return {
            props: {
                stats: response,
            },
        };
    }
};

export default ViewFile;
