import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";
// import Image from "next/image";

import NotFound from "@components/NotFound";
import { getFileIconFromExtension } from "@lib/IconUtils";

import { FileType, SettingsType } from "@sharex-server/common";

interface Props {
    message?: string;
    file: FileType;
    env: {
        app_url: string;
    };
    settings: SettingsType;
}

const ViewFile = ({ message, file, env, settings }: Props): JSX.Element => {
    const router = useRouter();

    if (message) return <NotFound />;

    const icon = getFileIconFromExtension(file.stats.fileName);

    return (
        <>
            <NextSeo
                title={file.name}
                canonical={`${env.app_url}/${router.asPath}`}
                description={`${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`}
                openGraph={{
                    title: file.name,
                    site_name: settings.name,
                    description: `${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`,
                    url: `${env.app_url}/${router.asPath}`,
                    type: "website",
                    images: [
                        {
                            url: `/file-icons/${icon}.svg`,
                        },
                    ],
                }}
            />
            <div className="h-screen flex items-center justify-center text-gray-50">
                <Fade direction="down"></Fade>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = await fetch(`${process.env.API_URL}/api/file/${params?.slug}`);
    const response = await data.json();

    if (response.message) {
        return { props: { message: response.message } };
    } else {
        return {
            props: {
                file: response,
                env: {
                    app_url: process.env.APP_URL,
                },
            },
        };
    }
};

export default ViewFile;
