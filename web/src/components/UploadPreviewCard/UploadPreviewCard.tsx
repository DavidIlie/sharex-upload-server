import Link from "next/link";

import { api_url } from "@lib/constants";
import { getFileIconFromExtension } from "@lib/iconUtils";
import type { FileType } from "@sharex-server/common";

interface UploadPreviewCardProps {
    file: FileType;
}

const UploadPreviewCard = ({ file }: UploadPreviewCardProps): JSX.Element => {
    const icon = getFileIconFromExtension(file.stats.extension);

    const href =
        file.type === "image"
            ? `${api_url}/image/${file.slug}`
            : `/f/${file.slug}`;

    return (
        <div className="m-6 flex flex-col">
            <Link href={href} passHref>
                <a className="flex-1 flex items-center" target="_blank">
                    {file.type === "image" ? (
                        <img
                            className="rounded-sm shadow-md duration-200 hoverItem ease-in-out"
                            height="256"
                            width="256"
                            src={`${api_url}/image/${file.slug}`}
                            alt={`${file.name}`}
                        />
                    ) : (
                        <div className="p-2 mb-1 flex flex-col w-full text-center overflow-ellipsis bg-dark-gray-800 rounded shadow-md duration-200 hoverItem ease-in-out">
                            <img
                                className="flex flex-1"
                                height="256"
                                width="256"
                                src={`/file-icons/${icon}.svg`}
                                alt={`${file.name}`}
                            />

                            <p className="pt-2 text-xs text-dark-gray-200 overflow-hidden overflow-ellipsis">
                                {file.name}
                            </p>
                        </div>
                    )}
                </a>
            </Link>

            <div className="p-2 mt-2 items-end grid grid-cols-2 text-center bg-dark-gray-800 rounded-md border-b border-dark-gray-900 shadow-md divide-x dark:divide-dark-gray-500">
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
