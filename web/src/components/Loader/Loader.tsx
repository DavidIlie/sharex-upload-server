import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

const Loader = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Loading" />
            <section className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
                <Fade>
                    <div className="loading-loader">
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                </Fade>
            </section>
        </>
    );
};

export default Loader;
