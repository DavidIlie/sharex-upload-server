import { NextSeo } from "next-seo";

const NotFound = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Not Found" />
            <div className="h-screen flex items-center justify-center">
                <div className="flex items-center justify-start pt-0">
                    <div className="px-4 text-2xl text-gray-300 border-r border-gray-500 tracking-wider">
                        404{" "}
                    </div>

                    <div className="ml-4 text-2xl text-gray-300 uppercase tracking-wider">
                        Not Found{" "}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
