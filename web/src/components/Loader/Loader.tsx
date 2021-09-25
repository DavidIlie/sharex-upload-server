import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

const Loader = (): JSX.Element => {
    return (
        <>
            <NextSeo title="Loading" />
            <section className="bg-gray-100 dark:bg-gray-900 h-screen flex justify-center items-center">
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
