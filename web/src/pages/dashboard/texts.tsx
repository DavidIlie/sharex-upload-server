import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";

import { isLoggedIn } from "@lib/isLoggedIn";
import type { FileType } from "@sharex-server/common";
import useEnv from "@hooks/useEnv";

import TextUploadModule from "@modules/dashboard/uploads/text";

import NavBar from "@components/NavBar";
import LargePreviewListPane from "@components/LargePreviewListPane";

const Images = (): JSX.Element => {
    const env = useEnv();

    const { data, isLoading } = useQuery<FileType[]>(
        `${env.api_url}/api/latest/texts/no-limit`
    );

    const [modalState, setModalState] = useState<boolean>(false);

    const updateModalState = () => {
        setModalState((modalState) => !modalState);
    };

    if (isLoading) return <div />;

    return (
        <>
            <NextSeo title="Text Files" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <Fade direction="up" triggerOnce>
                    <div className="flex justify-end px-6 mx-auto mb-3 max-w-7xl lg:px-8">
                        <button
                            className="inline-flex items-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md dark:bg-dark-gray-600 hover:bg-gray-700 dark:hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25"
                            onClick={updateModalState}
                        >
                            Upload Text
                        </button>
                    </div>
                    <LargePreviewListPane type="text" data={data} />
                </Fade>
            </div>
            <TextUploadModule
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
