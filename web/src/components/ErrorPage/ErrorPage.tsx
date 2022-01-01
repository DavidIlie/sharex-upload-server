import Link from "next/link";
import { NextSeo } from "next-seo";

interface ErrorPageProps {
    statusCode: number;
}

const ErrorPage = ({ statusCode }: ErrorPageProps): JSX.Element => {
    return (
        <>
            <NextSeo title="Crashed" />
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <div className="flex items-center justify-start">
                    <div className="ml-4 text-3xl font-semibold text-gray-300">
                        Well, this is awkward.
                    </div>
                </div>
                <div className="flex flex-col justify-center mt-1 text-lg font-semibold text-gray-600">
                    <h1>Looks like I have crashed. Apologies.</h1>
                </div>
                <div className="flex flex-col justify-center -mt-1 font-semibold text-gray-600">
                    <h1>
                        Did you follow the{" "}
                        <a
                            href="https://github.com/davidilie/sharex-upload-server/wiki"
                            target="_blank"
                            className="text-blue-500 duration-200 cursor-pointer hover:text-blue-600 hover:underline"
                        >
                            docs
                        </a>{" "}
                        correctly?
                    </h1>
                </div>
                <div className="flex flex-col justify-center mt-2 text-gray-800">
                    <Link href="/">
                        <a className="px-6 py-2 text-blue-100 duration-200 bg-blue-700 rounded hover:bg-blue-800">
                            Reload
                        </a>
                    </Link>
                </div>
                <div className="flex justify-center mt-2 text-sm text-gray-900">
                    {statusCode}
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
