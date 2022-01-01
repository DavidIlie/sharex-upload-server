import { shimmer } from "@lib/shimmer";
import Image from "next/image";

import { FileType } from "@sharex-server/common";

interface FileCardProps {
    file: FileType;
    icon: string;
}

const FileCard = ({ file, icon }: FileCardProps): JSX.Element => {
    return (
        <div className="flex flex-col overflow-hidden duration-200 bg-gray-100 border-2 border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-900 hoverItem">
            <div className="relative flex">
                <div className="ResponsiveFileCard sm:block sm:p-4">
                    <Image
                        className="w-32 h-32"
                        width="120%"
                        height="120%"
                        src={icon}
                        alt={file.stats.fileName}
                        placeholder="blur"
                        blurDataURL={shimmer(1920, 1080)}
                    />
                </div>
                <div className="py-5 pl-6 pr-6 sm:pl-0 justify-self-center">
                    <h1 className="text-lg font-semibold leading-6 text-black dark:text-white">
                        {file.name}
                    </h1>
                    <div className="flex flex-col pt-2">
                        <p className="font-mono text-gray-800 break-all dark:text-gray-400">
                            <span className="font-medium text-black dark:text-gray-300">
                                File size:{" "}
                            </span>
                            <br className="sm:hidden" />
                            {file.stats.size}
                        </p>
                        <p className="pt-3 font-mono text-gray-800 break-all dark:text-gray-400">
                            <span className="pr-2 font-medium text-black dark:text-gray-300">
                                MD5:
                            </span>
                            <br className="sm:hidden" />
                            {file.stats.md5}
                        </p>
                        <p className="pt-3 font-mono text-gray-800 break-all sm:pt-0 dark:text-gray-400">
                            <span className="font-medium text-black dark:text-gray-300">
                                SHA1:{" "}
                            </span>
                            <br className="sm:hidden" />
                            {file.stats.sha1}
                        </p>
                    </div>
                </div>
                <div className="relative z-0 flex items-center text-gray-600 opacity-10">
                    <div className="absolute ResponsiveFileHidden w-72 h-72 -right-12">
                        <img
                            className="transform rotate-45"
                            src={icon}
                            alt={file.stats.fileName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;
