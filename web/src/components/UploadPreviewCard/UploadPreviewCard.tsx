import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";

import { getFileIconFromExtension } from "@lib/iconUtils";
import { shimmer } from "@lib/shimmer";
import { axios } from "@lib/axiosClient";
import { queryClient } from "@lib/queryClient";
import useEnv from "@hooks/useEnv";
import type { FileType } from "@sharex-server/common";

import ConfirmModal from "@modules/misc/ConfirmModal";
import { usePrivacyStore } from "@global-stores/usePrivacyStore";

const UploadPreviewCard = ({
    file,
    type,
}: {
    file: FileType;
    type: "image" | "file" | "text";
}): JSX.Element => {
    const router = useRouter();

    const icon = getFileIconFromExtension(file.stats.extension);

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const updateConfirmDeleteState = () => setConfirmDelete(!confirmDelete);

    const env = useEnv();

    const { isPrivacyEnabled: isPrivacyModeEnabled } = usePrivacyStore();

    const href =
        file.type === "image"
            ? `${env.api_url}/image/${file.slug}`
            : file.type === "text"
            ? `/t/${file.slug}`
            : `/f/${file.slug}`;

    const deleteItem = async () => {
        const deleteTokenPromise = new Promise<string>(
            async (resolve, reject) => {
                const r = await axios.post(
                    `${env.api_url}/api/delete/${file.id}`
                );
                const response = r.data;
                if (r.status === 200) {
                    if (router.asPath.includes("/dashboard/")) {
                        queryClient.refetchQueries(
                            `${env.api_url}/api/latest/${type}s/no-limit`
                        );
                    } else {
                        queryClient.refetchQueries(
                            `${env.api_url}/api/latest/${type}s`
                        );
                        queryClient.refetchQueries(
                            `${env.api_url}/api/statistics`
                        );
                    }
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
            <div className="flex flex-col m-5 duration-200 bg-gray-200 border-2 border-gray-300 dark:bg-gray-800 hoverItem dark:border-gray-700">
                <Link href={href} passHref>
                    <a className="flex items-center flex-1" target="_blank">
                        {file.type === "image" ? (
                            <div className="relative">
                                {isPrivacyModeEnabled && (
                                    <div className="absolute inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-md" />
                                )}
                                <Image
                                    className={`rounded-sm shadow-md duration-200`}
                                    width={1000}
                                    height={1000}
                                    src={`/utils/imageproxy?url=${env.api_url}/image/${file.slug}`}
                                    alt={`${file.name}`}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={shimmer(
                                        file.stats.resolution?.width || 1920,
                                        file.stats.resolution?.height || 1080
                                    )}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col w-full p-2 text-center bg-gray-100 rounded shadow-md overflow-ellipsis dark:bg-dark-gray-900">
                                <Image
                                    className="flex flex-1"
                                    width={1000}
                                    height={1000}
                                    src={`/file-icons/${icon}.svg`}
                                    alt={`${file.name}`}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={shimmer(1920, 1080)}
                                />

                                <p className="pt-1 overflow-hidden text-xs text-black dark:text-dark-gray-200 overflow-ellipsis">
                                    {file.name}
                                </p>
                            </div>
                        )}
                    </a>
                </Link>

                <div className="grid grid-cols-2 p-2 text-center bg-white divide-x shadow-md dark:bg-dark-gray-800 dark:divide-dark-gray-500">
                    <Link href={href} passHref>
                        <a
                            className="text-gray-800 dark:text-gray-300 hover:text-dark-gray-400"
                            target="blank"
                        >
                            View
                        </a>
                    </Link>
                    <a
                        className="text-red-500 cursor-pointer"
                        onClick={() => updateConfirmDeleteState()}
                    >
                        Delete
                    </a>
                </div>
            </div>
            <ConfirmModal
                isOpen={confirmDelete}
                updateModalState={updateConfirmDeleteState}
                successFunction={deleteItem}
            />
        </>
    );
};

export default UploadPreviewCard;
