import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";

import type { FileType } from "@sharex-server/common";
import useEnv from "@hooks/useEnv";

import ImageUploadModule from "@modules/dashboard/uploads/image";

import NavBar from "@components/NavBar";
import LargePreviewListPane from "@components/LargePreviewListPane";
import { isLoggedIn } from "@lib/isLoggedIn";

const Images = (): JSX.Element => {
    const env = useEnv();
    const { data, isLoading } = useQuery<FileType[]>(
        `${env.api_url}/api/latest/images/no-limit`
    );

    const [modalState, setModalState] = useState<boolean>(false);

    const updateModalState = () => {
        setModalState((modalState) => !modalState);
    };

    if (isLoading) return <div />;

    return (
        <>
            <NextSeo title="Images" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <Fade direction="up" triggerOnce>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-end mb-3">
                        <button
                            className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-dark-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 mt-4"
                            onClick={updateModalState}
                        >
                            Upload Image
                        </button>
                    </div>
                    <LargePreviewListPane type="image" data={data} />
                </Fade>
            </div>
            <ImageUploadModule
                isOpen={modalState}
                updateModalState={updateModalState}
            />
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
