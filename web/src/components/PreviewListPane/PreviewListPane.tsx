import Link from "next/link";

interface PreviewListPaneProps {
    title: string;
    link: string;
    viewTitle: string;
    type: "image" | "file" | "text";
    children?: any;
}

const PreviewListPane = ({
    title,
    link,
    viewTitle,
    type,
    children,
}: PreviewListPaneProps): JSX.Element => {
    return (
        <div className="max-w-7xl mx-auto px-2 lg:px-8">
            <div className="overflow-hidden shadow-xl rounded-lg">
                <div className="p-6 flex items-center justify-between bg-gray-200 dark:bg-gray-800">
                    <div className="sm:text-xl text-black dark:text-dark-gray-100">
                        {title}
                    </div>
                    <Link href={link}>
                        <a>
                            <div className="flex items-center text-sm font-semibold text-blue-500 dark:text-blue-400">
                                <div>{viewTitle}</div>

                                <div className="ml-1 text-blue-600 dark:text-blue-500">
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {children && children.length === 0 && (
                        <>
                            <p className="px-4 pt-8 mb-1 col-span-6 text-center text-black dark:text-dark-gray-300">
                                You don't have any {type} uploads right now,
                                create an
                                <a
                                    className="text-blue-700 dark:text-blue-400"
                                    href="/user/api-keys"
                                >
                                    {" "}
                                    API key{" "}
                                </a>
                                to start uploading some.
                            </p>

                            <p className="px-4 pb-8 mb-2 col-span-6 text-center text-black dark:text-dark-gray-300">
                                You can find guides for how to setup ShareX to
                                use your API keys on the
                                <a
                                    className="text-blue-700 dark:text-blue-400"
                                    target="blank"
                                    href="https://github.com/DavidIlie/sharex-media-server/wiki"
                                >
                                    {" "}
                                    project wiki
                                </a>
                                .
                            </p>
                        </>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PreviewListPane;
