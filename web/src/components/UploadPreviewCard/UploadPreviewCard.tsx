import Link from "next/link";
import Image from "next/image";

import { api_url } from "@lib/constants";
import { getFileIconFromExtension } from "@lib/iconUtils";
import { shimmer } from "@lib/shimmer";

import type { FileType } from "@sharex-server/common";

const UploadPreviewCard = ({ file }: { file: FileType }): JSX.Element => {
    const icon = getFileIconFromExtension(file.stats.extension);

    const href =
        file.type === "image"
            ? `${api_url}/image/${file.slug}`
            : `/f/${file.slug}`;

    return (
        <div className="m-5 flex flex-col">
            <Link href={href} passHref>
                <a
                    className="flex-1 flex items-center duration-200 hoverItem ease-in-out"
                    target="_blank"
                >
                    {file.type === "image" ? (
                        <Image
                            className="rounded-sm shadow-md"
                            width={1000}
                            height={1000}
                            src={`${api_url}/image/${file.slug}`}
                            alt={`${file.name}`}
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={shimmer(
                                file.stats.resolution!.width,
                                file.stats.resolution!.height
                            )}
                        />
                    ) : (
                        <div className="p-2 mb-1 flex flex-col w-full text-center overflow-ellipsis bg-gray-100 dark:bg-dark-gray-800 rounded shadow-md duration-200 hoverItem ease-in-out">
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

                            <p className="pt-2 text-xs text-black dark:text-dark-gray-200 overflow-hidden overflow-ellipsis">
                                {file.name}
                            </p>
                        </div>
                    )}
                </a>
            </Link>

            <div className="p-2 mt-2 items-end grid grid-cols-2 text-center bg-white dark:bg-dark-gray-800 rounded-md border-b border-gray-200 dark:border-dark-gray-900 shadow-md divide-x dark:divide-dark-gray-500">
                <Link href={href} passHref>
                    <a
                        className="text-dark-gray-200 hover:text-dark-gray-400"
                        target="blank"
                    >
                        View
                    </a>
                </Link>

                <a className="text-red-500 hover:text-red-400 cursor-pointer">
                    Delete
                </a>
            </div>
        </div>
    );
};

export default UploadPreviewCard;
