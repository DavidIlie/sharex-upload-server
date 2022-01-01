import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";

import NotFound from "@components/NotFound";
import FileCard from "@components/FileCard/FileCard";
import { getFileIconFromExtension } from "@lib/iconUtils";
import useSettings from "@hooks/useSettings";

import { FileType } from "@sharex-server/common";
import useEnv from "@hooks/useEnv";

interface Props {
    message?: string;
    file: FileType;
    api_url: string;
}

const ViewFile = ({ message, file, api_url }: Props): JSX.Element => {
    const router = useRouter();
    const { slug } = router.query;

    if (message) return <NotFound />;

    const env = useEnv();

    const settings = useSettings();

    const icon = getFileIconFromExtension(file.stats.extension);

    return (
        <>
            <NextSeo
                title={file.name}
                canonical={router.basePath}
                description={`${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`}
                openGraph={{
                    title: file.name,
                    site_name: settings.name || env.default_app_name,
                    description: `${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`,
                    url: router.basePath,
                    type: "website",
                    images: [
                        {
                            url: `/file-icons/${icon}.svg`,
                        },
                    ],
                }}
            />
            <div className="flex items-center justify-center h-screen text-gray-50">
                <Fade direction="down">
                    <div>
                        <FileCard
                            file={file}
                            icon={`/file-icons/${icon}.svg`}
                        />
                        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                            <div className="flex justify-center pt-6">
                                <a
                                    href={`${api_url}/dl/${slug}`}
                                    className="px-4 py-2 text-lg duration-150 bg-indigo-600 rounded shadow hover:bg-indigo-700"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = await fetch(
        `${process.env.SERVER_API_URL}/api/file/${params?.slug}`
    );
    const response = await data.json();

    if (response.message) {
        return { props: { message: response.message } };
    } else {
        return {
            props: {
                file: response,
                api_url: process.env.SERVER_API_URL,
            },
        };
    }
};

export default ViewFile;
