import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";

import NotFound from "@components/NotFound";
import FileCard, { StatTypes } from "@components/FileCard/FileCard";
import { getFileIconFromExtension } from "@lib/IconUtils";

interface Props {
    message?: string;
    stats: StatTypes;
}

const ViewFile = ({ message, stats }: Props): JSX.Element => {
    const router = useRouter();
    const { slug } = router.query;

    const icon = getFileIconFromExtension(stats.fileName);

    if (message) return <NotFound />;

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
                    type: "article",
                    // article: {
                    //     publishedTime: new Date(
                    //         frontMatter.publishedAt
                    //     ).toISOString(),
                    // },
                    images: [
                        {
                            url: `/file-icons/${icon}.svg`,
                        },
                    ],
                }}
            />
            <div className="h-screen flex items-center justify-center text-gray-50">
                <Fade direction="down">
                    <div>
                        <FileCard
                            stats={stats}
                            icon={`/file-icons/${icon}.svg`}
                        />
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="pt-6 flex justify-center">
                                <a
                                    href=""
                                    className="px-4 py-2 text-lg bg-indigo-600 hover:bg-indigo-700 duration-150 rounded shadow"
                                >
                                    Download
                                </a>
                            </div>
                            {icon === "image" && (
                                <div className="sm:pt-6 flex justify-center">
                                    <a
                                        href={`http://localhost:4000/image/${slug}`}
                                        className="px-4 py-2 text-lg bg-gray-600 hover:bg-gray-700 duration-150 rounded shadow"
                                    >
                                        Preview
                                    </a>
                                </div>
                            )}{" "}
                        </div>
                    </div>
                </Fade>
            </div>
        </>
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
