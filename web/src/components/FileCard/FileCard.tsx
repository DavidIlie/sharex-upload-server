import { shimmer } from "@lib/shimmer";
import Image from "next/image";

export interface StatTypes {
    size: string;
    extension: string;
    fileName: string;
    md5: string;
    sha1: string;
}

interface FileCardProps {
    stats: StatTypes;
    icon: string;
}

const FileCard = ({ stats, icon }: FileCardProps): JSX.Element => {
    return (
        <div className="flex flex-col border-2 bg-gray-800 border-gray-900 rounded-md shadow-lg overflow-hidden duration-200 hoverItem">
            <div className="flex relative">
                <div className="ResponsiveFileCard sm:block sm:p-4">
                    <Image
                        className="w-32 h-32"
                        width="120%"
                        height="120%"
                        src={icon}
                        alt={stats.fileName}
                        placeholder="blur"
                        blurDataURL={shimmer(1920, 1080)}
                    />
                </div>
                <div className="pl-6 sm:pl-0 py-5 pr-6 justify-self-center">
                    <h1 className="text-lg leading-6 font-semibold">
                        {stats.fileName}
                    </h1>
                    <div className="pt-2 flex flex-col">
                        <p className="text-gray-400 font-mono break-all">
                            <span className="text-gray-300 font-medium">
                                File size:{" "}
                            </span>
                            <br className="sm:hidden" />
                            {stats.size}
                        </p>
                        <p className="pt-3 text-gray-400 font-mono break-all">
                            <span className="text-gray-300 font-medium pr-2">
                                MD5:
                            </span>
                            <br className="sm:hidden" />
                            {stats.md5}
                        </p>
                        <p className="pt-3 sm:pt-0 text-gray-400 font-mono break-all">
                            <span className="text-gray-300 font-medium">
                                SHA1:{" "}
                            </span>
                            <br className="sm:hidden" />
                            {stats.sha1}
                        </p>
                    </div>
                </div>
                <div className="relative z-0 flex items-center text-gray-600 opacity-10">
                    <div className="ResponsiveFileHidden absolute w-72 h-72 -right-12">
                        <img
                            className="transform rotate-45"
                            src={icon}
                            alt={stats.fileName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;
