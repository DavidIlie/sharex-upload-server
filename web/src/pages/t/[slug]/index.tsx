import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

//@ts-ignore
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, light } from "@lib/syntaxThemes";

import NotFound from "@components/NotFound";
import useSettings from "@hooks/useSettings";

import { FileType } from "@sharex-server/common";

interface Props {
    message?: string;
    file: FileType;
    text: string;
}

const ViewFile = ({ message, file, text }: Props): JSX.Element => {
    const router = useRouter();

    if (message) return <NotFound />;

    const settings = useSettings();

    const { theme } = useTheme();

    return (
        <>
            <NextSeo
                title={file.name}
                canonical={router.basePath}
                description={`${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`}
                openGraph={{
                    title: file.name,
                    site_name: settings.name || "ShareX Upload Server",
                    description: `${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`,
                    url: router.basePath,
                    type: "website",
                }}
            />
            <svg
                className="w-8 h-8 text-blue-400 cursor-pointer"
                //TODO: MAKE THIS FOLLOW YOU
                style={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "4rem",
                    zIndex: 500,
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            <div className="font-sans antialiased -my-2">
                <SyntaxHighlighter
                    style={theme === "light" ? light : dark}
                    language={file.stats.extension}
                    className="min-h-screen"
                    showLineNumbers={true}
                >
                    {text}
                </SyntaxHighlighter>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = await fetch(
        `${process.env.SERVER_API_URL}/api/text/${params?.slug}`
    );
    const response = await data.json();

    if (response.message) {
        return { props: { message: response.message } };
    } else {
        return {
            props: {
                file: response.file,
                text: response.text,
            },
        };
    }
};

export default ViewFile;
