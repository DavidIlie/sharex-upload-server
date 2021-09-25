import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fade } from "react-awesome-reveal";

const Loader = (): JSX.Element => {
    const router = useRouter();
    const path = router.pathname;

    return (
        <>
            {!path.startsWith("/f") && <NextSeo title="Loading" />}
            <section className="h-screen flex justify-center items-center">
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
