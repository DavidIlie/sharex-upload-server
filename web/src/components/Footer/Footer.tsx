import { is_dev } from "@lib/constants";

const Footer = (): JSX.Element => {
    return (
        <footer className="flex justify-center items-center shadow bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-dark-gray-200">
                <a
                    href="https://github.com/DavidIlie/sharex-media-server"
                    target="_blank"
                    className="font-semibold hover:underline"
                >
                    sharex-media-server v0.1.2{is_dev && "-DEV"}
                </a>
                <p className="text-sm">
                    Created by{" "}
                    <a
                        className="text-indigo-400 hover:text-indigo-500 duration-150 font-semibold"
                        href="https://davidilie.com"
                        target="_blank"
                    >
                        David Ilie
                    </a>
                    , powered by
                    <a
                        className="text-indigo-400 hover:text-indigo-500 font-semibold"
                        href="https://nextjs.org/"
                        target="_blank"
                    >
                        {" "}
                        Next.js
                    </a>
                    ,
                    <a
                        className="text-indigo-400 hover:text-indigo-500 font-semibold"
                        href="https://expressjs.com/"
                        target="_blank"
                    >
                        {" "}
                        Express.js
                    </a>
                    , and
                    <a
                        className="text-indigo-400 hover:text-indigo-500 font-semibold"
                        href="https://tailwindcss.com/"
                        target="_blank"
                    >
                        {" "}
                        Tailwind CSS
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

export default Footer;
