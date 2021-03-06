import { GetServerSideProps } from "next";
import { useState, useRef, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

//@ts-ignore
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, light } from "@lib/syntaxThemes";

import useSettings from "@hooks/useSettings";
import useUser from "@hooks/useUser";
import type { FileType } from "@sharex-server/common";
import { axios } from "@lib/axiosClient";
import useEnv from "@hooks/useEnv";

import NotFound from "@components/NotFound";
import ConfirmModal from "@modules/misc/ConfirmModal";

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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const words = text.split(/\s+/gu).length;
    const lines = text.split(/\r\n|\r|\n/).length;
    const user = useUser();
    const env = useEnv();
    const ref = useRef<HTMLDivElement>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const toggleModal = () => setOpenModal(!openModal);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const deleteText = async () => {
        const deleteTokenPromise = new Promise<string>(
            async (resolve, reject) => {
                const r = await axios.post(
                    `${env.api_url}/api/delete/${file.id}`
                );
                const response = r.data;
                if (r.status === 200) {
                    router.push("/dashboard");
                    resolve(response.message);
                } else {
                    reject(response.message);
                }
            }
        );

        toast.promise(deleteTokenPromise, {
            loading: "Loading",
            success: "Deleted successfully!",
            error: "Error when fetching!",
        });
    };

    return (
        <>
            <NextSeo
                title={file.name}
                canonical={router.basePath}
                description={`${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`}
                openGraph={{
                    title: `${text.split(/\r\n|\r|\n/)[0]}...`,
                    site_name: settings.name || env.default_app_name,
                    description: `${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`,
                    url: router.basePath,
                    type: "website",
                }}
            />
            <div
                className="absolute bottom-5 right-12"
                style={{ zIndex: 500 }}
                ref={ref as any}
            >
                {isOpen && (
                    <div className="absolute w-64 p-4 text-sm text-black bg-gray-100 rounded shadow-md bottom-14 -right-2 dark:bg-gray-900 dark:text-white">
                        <p className="pb-2 text-base font-bold text-center">
                            File Information
                        </p>
                        <div className="divide-y divide-gray-500 dark:divide-gray-800">
                            <div className="flex justify-between">
                                <span className="pr-2 font-semibold text-blue-600 dark:text-blue-400">
                                    ID
                                </span>
                                <span className="overflow-hidden overflow-ellipsis">
                                    {file.slug}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="pr-2 font-semibold text-blue-600 dark:text-blue-400">
                                    Name
                                </span>
                                <span className="overflow-hidden overflow-ellipsis">
                                    {file.name}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="pr-2 font-semibold text-blue-600 dark:text-blue-400">
                                    Extension
                                </span>
                                <span className="overflow-hidden overflow-ellipsis">
                                    {file.stats.extension}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="pr-2 font-semibold text-blue-600 dark:text-blue-400">
                                    Lines
                                </span>
                                <span className="overflow-hidden overflow-ellipsis">
                                    {lines}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="pr-2 font-semibold text-blue-600 dark:text-blue-400">
                                    Words
                                </span>
                                <span className="overflow-hidden overflow-ellipsis">
                                    {words}
                                </span>
                            </div>

                            {user.name && (
                                <button
                                    onClick={toggleModal}
                                    className="flex justify-center w-full px-6 py-2 mt-2 font-semibold text-red-100 bg-red-600 rounded"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <svg
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute w-8 h-8 text-blue-600 cursor-pointer bottom-3 right-3 dark:text-blue-400"
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
            </div>
            <div className="h-screen -mt-2 -mb-4 font-sans antialiased">
                <SyntaxHighlighter
                    style={theme === "light" ? light : dark}
                    language={file.stats.extension}
                    className="h-screen"
                    showLineNumbers={true}
                >
                    {text}
                </SyntaxHighlighter>
            </div>
            <ConfirmModal
                isOpen={openModal}
                updateModalState={toggleModal}
                successFunction={deleteText}
            />
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
