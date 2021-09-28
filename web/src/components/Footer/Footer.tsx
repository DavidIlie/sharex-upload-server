import { is_dev } from "@lib/constants";
import useSettings from "@hooks/useSettings";

const Footer = (): JSX.Element => {
    const settings = useSettings();
    return (
        <footer className="shadow bg-gray-100 dark:bg-gray-800">
            <div className="sm:flex flex-wrap items-center justify-evenly max-w-7xl mx-auto py-6 text-center text-gray-600 dark:text-dark-gray-100">
                <a className="font-semibold">
                    {settings.name || "ShareX Upload Server"}
                </a>
                <div className="sm:py-0 py-3">
                    <p className="text-sm">
                        Created by{" "}
                        <a
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 duration-150 font-semibold"
                            href="https://davidilie.com"
                            target="_blank"
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
                        >
                            {" "}
                            Next.js
                        </a>
                        ,
                        <a
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 font-semibold"
                            href="https://expressjs.com/"
                            target="_blank"
                        >
                            {" "}
                            Express.js
                        </a>
                        , and
                        <a
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 font-semibold"
                            href="https://tailwindcss.com/"
                            target="_blank"
                        >
                            {" "}
                            Tailwind CSS
                        </a>
                        .
                    </p>
                </div>

                <a
                    href="https://github.com/DavidIlie/sharex-upload-server"
                    target="_blank"
                    className="font-semibold hover:underline"
                >
                    Version 0.5.5{is_dev && "-DEV"}
                </a>
            </div>
        </footer>
    );
};

export default Footer;
