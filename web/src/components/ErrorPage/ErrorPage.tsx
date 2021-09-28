import Link from "next/link";
import { NextSeo } from "next-seo";

interface ErrorPageProps {
    statusCode: number;
}

const ErrorPage = ({ statusCode }: ErrorPageProps): JSX.Element => {
    return (
        <>
            <NextSeo title="Crashed" />
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <div className="flex items-center justify-start">
                    <div className="ml-4 text-3xl text-gray-300 font-semibold">
                        Well, this is awkward.
                    </div>
                </div>
                <div className="flex flex-col justify-center text-lg mt-1 text-gray-600 font-semibold">
                    <h1>Looks like I have crashed. Apologies.</h1>
                </div>
                <div className="-mt-1 flex flex-col justify-center text-gray-600 font-semibold">
                    <h1>
                        Did you follow the{" "}
                        <a
                            href="https://github.com/davidilie/sharex-upload-server/wiki"
                            target="_blank"
                            className="duration-200 text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
                        >
                            docs
                        </a>{" "}
                        correctly?
                    </h1>
                </div>
                <div className="flex flex-col justify-center mt-2 text-gray-800">
                    <Link href="/">
                        <a className="px-6 py-2 bg-blue-700 hover:bg-blue-800 duration-200 text-blue-100 rounded">
                            Reload
                        </a>
                    </Link>
                </div>
                <div className="flex justify-center text-sm mt-2 text-gray-900">
                    {statusCode}
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
