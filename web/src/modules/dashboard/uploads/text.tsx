import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import useFileUpload from "react-use-file-upload";
import { MouseEvent } from "react";

import { axios } from "@lib/axiosClient";
import useEnv from "@hooks/useEnv";
import { queryClient } from "@lib/queryClient";

import Modal from "@ui/Modal";

interface TextUploadModuleProps {
    isOpen: boolean;
    updateModalState: () => void;
}

const TextUploadModule = ({
    isOpen,
    updateModalState,
}: TextUploadModuleProps): JSX.Element => {
    const env = useEnv();

    const { files, setFiles, clearAllFiles } = useFileUpload();
    const inputRef = useRef<HTMLInputElement>();

    const [uploadFileState, setUploadFileState] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<string | boolean>(false);

    useEffect(() => {
        try {
            if (files.length >= 1) {
                if (inputRef.current?.files?.length !== 0) {
                    setUploadFileState(true);
                }
            }
        } catch (_err) {}
    });

    const HandleUpload = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("text", files[0]);

        try {
            const r = await axios.post(`${env.api_url}/api/texts`, formData, {
                headers: { "content-type": "multipart/form-data" },
            });
            const response = await r.data;

            if (r.status !== 200) {
                toast.error(response.message || "unknown error");
            } else {
                clearAllFiles();
                setUploadFileState(false);
                setUploaded(response.message);

                queryClient.refetchQueries(
                    `${env.api_url}/api/latest/texts/no-limit`
                );

                toast.success("Upload successfully!");
            }
        } catch (error) {
            toast.error((error as any).message || "unknown error");
        }

        setIsLoading(false);
    };

    const HandleCancel = () => {
        try {
            //@ts-ignore
            inputRef.current.files = [];
        } catch (_err) {}
        clearAllFiles();
        setUploadFileState(false);
        setUploaded(false);

        updateModalState();
    };

    return (
        <Modal
            isOpen={isOpen}
            updateModalState={HandleCancel}
            title="Upload Text"
        >
            <>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Select the text file you want to upload.
                    </p>
                    {typeof uploaded === "string" && (
                        <div className="my-4">
                            <p className="pb-2 text-gray-500">
                                The text file has been uploaded successfully,
                                you can copy the link below to share the file
                                with other people.
                            </p>
                            <input
                                className="w-full px-3 py-2 text-base text-gray-600 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-dark-gray-700 focus:ring-opacity-50"
                                type="text"
                                value={uploaded as never}
                                //@ts-ignore
                                onClick={(e) => e.target.select()}
                            />
                        </div>
                    )}
                    <div className="col-span-6 sm:col-span-4">
                        <div className="flex items-center">
                            <input
                                ref={inputRef as any}
                                type="file"
                                className="hidden"
                                onChange={(e) => setFiles(e as any)}
                            />
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 mt-2 mr-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-900 dark:border-dark-gray-800 dark:text-dark-gray-100 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
                                onClick={() => inputRef.current?.click()}
                            >
                                Select a text file to upload
                            </button>
                        </div>
                        {files.length !== 0 && (
                            <p className="px-2 pt-2">
                                {(files as any)[0].name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 duration-150 bg-blue-100 border border-transparent rounded-md dark:text-gray-100 dark:bg-dark-gray-900 hover:bg-blue-200 dark:hover:bg-dark-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => HandleCancel()}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={!uploadFileState}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 duration-150 bg-blue-100 border border-transparent rounded-md disabled:opacity-25 dark:text-gray-100 dark:bg-gray-900 hover:bg-blue-200 dark:hover:bg-dark-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={(e) => HandleUpload(e)}
                    >
                        {isLoading ? "Uploading" : "Upload"}
                    </button>
                </div>
            </>
        </Modal>
    );
};

export default TextUploadModule;
