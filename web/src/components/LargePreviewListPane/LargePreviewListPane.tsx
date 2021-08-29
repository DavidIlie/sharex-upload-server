import { useState } from "react";

import type { FileType } from "@sharex-server/common";

import UploadPreviewCard from "@components/UploadPreviewCard";

interface LargePreviewListPaneProps {
    type: "image" | "file" | "text";
    data: FileType[] | undefined;
}

const LargePreviewListPane = ({
    type,
    data,
}: LargePreviewListPaneProps): JSX.Element => {
    const postsPerPage = 24;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
    const lastPageNumber = Math.ceil(data!.length / postsPerPage);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(data!.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-gray-200 dark:bg-gray-800 dark:bg-opacity-25 overflow-hidden shadow-xl sm:rounded-lg">
                {data?.length === 0 || data === undefined ? (
                    <>
                        <p className="px-4 pt-8 mb-4 col-span-6 text-center text-black dark:text-dark-gray-300">
                            You don't have any {type} uploads right now, create
                            an
                            <a
                                className="text-indigo-700 dark:text-indigo-400"
                                href="/user/api-keys"
                            >
                                {" "}
                                API key{" "}
                            </a>
                            to start uploading some.
                        </p>

                        <p className="px-4 pb-8 col-span-6 text-center text-black dark:text-dark-gray-300">
                            You can find guides for how to setup ShareX to use
                            your API keys on the
                            <a
                                className="text-indigo-700 dark:text-indigo-400"
                                target="blank"
                                href="https://github.com/DavidIlie/sharex-media-server"
                            >
                                {" "}
                                project page
                            </a>
                            .
                        </p>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 dark:text-dark-gray-400">
                            {currentPosts?.map((file, index) => (
                                <UploadPreviewCard file={file} key={index} />
                            ))}
                        </div>
                        {data.length > 24 && (
                            <div className="p-4 bg-gray-200 dark:bg-gray-800 border-t border-gray-400 dark:border-dark-gray-900">
                                <nav className="flex items-center justify-between">
                                    <div className="flex justify-between flex-1 sm:hidden">
                                        <span>
                                            <button
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage - 1
                                                    )
                                                }
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                    currentPage === 1
                                                        ? "text-gray-500 dark:text-dark-gray-400"
                                                        : "text-black dark:text-white"
                                                } bg-white dark:bg-dark-gray-500 border border-gray-200 dark:border-dark-gray-900 cursor-default leading-5 rounded-md`}
                                            >
                                                « Previous
                                            </button>
                                        </span>

                                        <span>
                                            <button
                                                disabled={
                                                    currentPage ===
                                                    lastPageNumber
                                                }
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage + 1
                                                    )
                                                }
                                                className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium ${
                                                    currentPage ===
                                                    lastPageNumber
                                                        ? "text-gray-500 dark:text-dark-gray-400"
                                                        : "text-black dark:text-white"
                                                } bg-white dark:bg-dark-gray-500 border-gray-200 dark:border-dark-gray-900 border leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                            >
                                                Next »
                                            </button>
                                        </span>
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <p className="text-sm text-black dark:text-dark-gray-400 leading-5">
                                            Showing {indexOfFirstPost + 1} to{" "}
                                            {indexOfFirstPost +
                                                currentPosts!.length}{" "}
                                            of {data!.length} results
                                        </p>
                                        <span className="relative z-0 inline-flex shadow-sm">
                                            <button
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage - 1
                                                    )
                                                }
                                            >
                                                <span
                                                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500  dark:text-dark-gray-400 bg-white dark:bg-dark-gray-500 border border-gray-300 dark:border-dark-gray-900 cursor-default rounded-l-md leading-5"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </button>
                                            {pageNumbers.map(
                                                (pageNum, index) => (
                                                    <span key={index}>
                                                        <span>
                                                            {pageNum ===
                                                            currentPage ? (
                                                                <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 dark:text-dark-gray-400 bg-white dark:bg-dark-gray-500 border border-gray-300 dark:border-dark-gray-900 cursor-default leading-5">
                                                                    {pageNum}
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    onClick={() =>
                                                                        setCurrentPage(
                                                                            pageNum
                                                                        )
                                                                    }
                                                                    className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-dark-gray-500 border border-gray-300 dark:border-dark-gray-900 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                                                                >
                                                                    {pageNum}
                                                                </button>
                                                            )}
                                                        </span>
                                                    </span>
                                                )
                                            )}
                                            <button
                                                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 dark:text-dark-gray-400 bg-white dark:bg-dark-gray-500 border border-gray-300 dark:border-dark-gray-900 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                                disabled={
                                                    currentPage ===
                                                    lastPageNumber
                                                }
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage + 1
                                                    )
                                                }
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </span>
                                    </div>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LargePreviewListPane;