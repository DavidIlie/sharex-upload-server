import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";
// import Image from "next/image";

import NotFound from "@components/NotFound";
import { StatTypes } from "@components/FileCard/FileCard";
import { getFileIconFromExtension } from "@lib/IconUtils";

interface Props {
    message?: string;
    stats: StatTypes;
}

const ViewFile = ({ message, stats }: Props): JSX.Element => {
    const router = useRouter();
    const { slug } = router.query;

    if (message) return <NotFound />;

    const icon = getFileIconFromExtension(stats.fileName);

    return (
        <>
            <NextSeo
                title={stats.fileName}
                canonical={`http://localhost:3000/${router.asPath}`}
                description={`${stats.fileName} - ${stats.size} - MD5: ${stats.md5}`}
                openGraph={{
                    title: stats.fileName,
                    site_name: "ShareX Media Server",
                    description: `${stats.fileName} - ${stats.size} - MD5: ${stats.md5}`,
                    url: `http://localhost:3000/${router.asPath}`,
                    type: "website",
                    images: [
                        {
                            url: `/file-icons/${icon}.svg`,
                        },
                    ],
                }}
            />
            <div className="h-screen flex items-center justify-center text-gray-50">
                <Fade direction="down">
                    <div className="border-2 bg-gray-800 border-gray-900 p-2 hoverItem duration-200">
                        {
                            //TODO switch to next/image without breaking resolution
                        }
                        <img
                            className="sm:max-w-2xl max-w-md"
                            src={`http://localhost:4000/image/${slug}`}
                        />
                    </div>
                </Fade>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    console.log(params);
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
