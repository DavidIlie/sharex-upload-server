import React from "react";

const Footer = (): JSX.Element => {
    return (
        <div
            className="flex justify-center items-center shadow"
            style={{ background: "#171923" }}
        >
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-dark-gray-200">
                <a
                    href="https://github.com/DavidIlie/sharex-media-server"
                    target="blank"
                    className="font-semibold hover:underline"
                >
                    sharex-media-server v0.0.1-DEV
                </a>
                <p className="text-sm">
                    Created by{" "}
                    <a
                        className="text-indigo-500 hover:text-indigo-600 duration-150 font-semibold"
                        href="https://davidilie.com"
                    >
                        David Ilie
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
