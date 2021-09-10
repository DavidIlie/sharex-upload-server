import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import toast from "react-hot-toast";

import type { FileType } from "@sharex-server/common";
import { isLoggedIn } from "@lib/isLoggedIn";

import Modal from "@ui/Modal";

import NavBar from "@components/NavBar";
import LargePreviewListPane from "@components/LargePreviewListPane";

const Images = (): JSX.Element => {
    const [modalState, setModalState] = useState<boolean>(false);

    const { data, isLoading } = useQuery<FileType[]>(
        "/api/latest/files/no-limit"
    );

    const updateModalState = () => {
        setModalState((modalState) => !modalState);
    };

    if (isLoading) return <div />;

    return (
        <>
            <NextSeo title="Files" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-6" />
                <Fade direction="up" triggerOnce>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-end mb-3">
                        <button
                            className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-dark-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 mt-4"
                            onClick={updateModalState}
                        >
                            Upload File
                        </button>
                    </div>
                    <LargePreviewListPane type="file" data={data} />
                </Fade>
            </div>
            <Modal
                isOpen={modalState}
                updateModalState={updateModalState}
                title="Upload file"
            >
                <>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Select the file you want to upload.
                        </p>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={updateModalState}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() =>
                                toast("coming soon!", { icon: "💻" })
                            }
                        >
                            Upload
                        </button>
                    </div>
                </>
            </Modal>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    await isLoggedIn(req, res);
    return {
        props: {},
    };
};

export default Images;
