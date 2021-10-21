import { useQuery } from "react-query";

import { is_dev } from "@lib/constants";
import useSettings from "@hooks/useSettings";
import useEnv from "@hooks/useEnv";
import { appVersion } from "@sharex-server/common";
import Tooltip from "@ui/Tooltip";

interface Response {
    latestVersion?: number;
    version: number;
    state: "update" | "latest";
}

const Footer = (): JSX.Element => {
    const settings = useSettings();
    const env = useEnv();

    const { isLoading, data, error } = useQuery<Response>(
        `${env.api_url}/api/check-version`,
        { refetchOnWindowFocus: false, refetchOnReconnect: false, retry: false }
    );

    return (
        <footer className="shadow bg-gray-100 dark:bg-gray-800">
            <div className="sm:flex flex-wrap items-center justify-evenly max-w-7xl mx-auto py-6 text-center text-gray-600 dark:text-dark-gray-100">
                <span className="font-semibold">
                    {settings.name || "ShareX Upload Server"}
                </span>
                <div className="sm:py-0 py-3">
                    <p className="text-sm">
                        Created by{" "}
                        <a
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 duration-150 font-semibold"
                            href="https://davidilie.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            David Ilie
                        </a>
                        .
                    </p>
                    <p className="text-sm">
                        Powered by
                        <a
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 font-semibold"
                            href="https://nextjs.org/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {" "}
                            Next.js
                        </a>
                        ,
                        <a
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 font-semibold"
                            href="https://expressjs.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {" "}
                            Express.js
                        </a>
                        , and
                        <a
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 font-semibold"
                            href="https://tailwindcss.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {" "}
                            Tailwind CSS
                        </a>
                        .
                    </p>
                </div>

                {isLoading || error ? (
                    <Tooltip content="Cannot check version, please check console!">
                        <a
                            href="https://github.com/DavidIlie/sharex-upload-server"
                            target="_blank"
                            className="font-semibold hover:underline"
                            rel="noreferrer"
                        >
                            Version {appVersion}
                            {is_dev && "-DEV"}
                        </a>
                    </Tooltip>
                ) : data?.state === "latest" ? (
                    <a
                        href="https://github.com/DavidIlie/sharex-upload-server"
                        target="_blank"
                        className="font-semibold hover:underline"
                        rel="noreferrer"
                    >
                        Version {data?.version}
                        {is_dev && "-DEV"}
                    </a>
                ) : (
                    <Tooltip
                        content={`You are currently out of date, the latest is v${data?.latestVersion}!`}
                    >
                        <a
                            href="https://github.com/DavidIlie/sharex-upload-server/wiki/Upgrading"
                            target="_blank"
                            className="font-semibold hover:underline"
                            rel="noreferrer"
                        >
                            Version {data?.version}
                            {is_dev && "-DEV"} (Outdated)
                        </a>
                    </Tooltip>
                )}
            </div>
        </footer>
    );
};

export default Footer;
