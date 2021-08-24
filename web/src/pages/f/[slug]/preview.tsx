import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";
// import Image from "next/image";

import NotFound from "@components/NotFound";
import { FileTypes } from "@components/FileCard/FileCard";
import { getFileIconFromExtension } from "@lib/IconUtils";

interface Props {
    message?: string;
    file: FileTypes;
}

const ViewFile = ({ message, file }: Props): JSX.Element => {
    const router = useRouter();

    if (message) return <NotFound />;

    const icon = getFileIconFromExtension(file.stats.fileName);

    return (
        <>
            <NextSeo
                title={file.name}
                canonical={`http://localhost:3000/${router.asPath}`}
                description={`${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`}
                openGraph={{
                    title: file.name,
                    site_name: "ShareX Media Server",
                    description: `${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`,
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
                <Fade direction="down"></Fade>
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
                file: response,
            },
        };
    }
};

export default ViewFile;
