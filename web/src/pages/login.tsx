import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

import { loginSchema } from "@sharex-server/common";
import { noRedirectIsLoggedIn } from "@lib/isLoggedIn";
import useEnv from "@hooks/useEnv";
import { axios } from "@lib/axiosClient";
import { getSettingsData } from "@lib/settingsManager";
import { getUserData } from "@lib/userManager";
import { useSettingsStore } from "@global-stores/useSettingsStore";
import { useUserStore } from "@global-stores/useUserStore";

import Tooltip from "@ui/Tooltip";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Radio from "@ui/form/Radio";
import SubmitButton from "@ui/form/SubmitButton";

interface Props {
    stats: {
        totalFiles: number;
        totalSize: {
            value: number;
            unit: string;
        };
    };
}

const Login = ({ stats }: Props): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState<boolean | string>(false);
    const router = useRouter();

    const { settings, updateSettings } = useSettingsStore();
    const { updateUser } = useUserStore();
    const env = useEnv();

    return (
        <>
            <NextSeo title="Login" />
            <div className="h-screen flex flex-col justify-center items-center">
                <Fade direction="up" cascade>
                    <Tooltip content="View project on GitHub">
                        <a
                            href="https://github.com/davidilie/sharex-upload-server"
                            rel="noreferrer"
                            className="text-3xl font-medium text-black dark:text-white"
                        >
                            {settings.name}
                        </a>
                    </Tooltip>
                    <div className="w-full sm:max-w-md mt-3 px-6 py-4 border-2 bg-white dark:bg-dark-gray-800 border-gray-200 dark:border-gray-900 shadow-md overflow-hidden sm:rounded-lg">
                        <Formik
                            validateOnChange={false}
                            validateOnBlur={false}
                            validationSchema={loginSchema}
                            initialValues={{
                                email: "",
                                password: "",
                                remember: false,
                            }}
                            onSubmit={async (
                                data,
                                { setSubmitting, resetForm }
                            ) => {
                                setSubmitting(true);

                                const r = await axios.post(
                                    `${env.api_url}/api/auth/login`,
                                    data
                                );
                                const response = await r.data;

                                if (r.status !== 200) {
                                    setErrorMessage(response.message);
                                } else {
                                    updateSettings(await getSettingsData(env));
                                    updateUser(await getUserData(env));
                                    router.push("/dashboard");
                                }

                                setSubmitting(false);
                                resetForm();
                            }}
                        >
                            {({ errors, isSubmitting }) => (
                                <Form>
                                    {typeof errorMessage === "string" && (
                                        <div className="mb-4">
                                            <div className="font-medium text-red-400">
                                                Whoops! Something went wrong.
                                            </div>

                                            <ul className="mt-3 list-disc list-inside text-sm text-red-400">
                                                <li>{errorMessage}</li>
                                            </ul>
                                        </div>
                                    )}
                                    {errors.email ||
                                        (errors.password && (
                                            <div className="mb-4">
                                                <div className="font-medium text-red-400">
                                                    Whoops! Something went
                                                    wrong.
                                                </div>

                                                <ul className="mt-3 list-disc list-inside text-sm text-red-400">
                                                    {errors.email && (
                                                        <li>{errors.email}</li>
                                                    )}
                                                    {errors.password && (
                                                        <li>
                                                            {errors.password}
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    <div className="flex flex-wrap">
                                        <div className="w-full">
                                            <Label>Email</Label>
                                            <Field
                                                name="email"
                                                type="email"
                                                required
                                                as={Input}
                                            />
                                        </div>
                                        <div className="w-full mt-4">
                                            <Label>Password</Label>
                                            <Field
                                                name="password"
                                                type="password"
                                                required
                                                as={Input}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <Field
                                                name="remember"
                                                label="Remember me"
                                                as={Radio}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mt-3">
                                        <SubmitButton
                                            text={
                                                isSubmitting
                                                    ? "Signing in"
                                                    : "Sign in"
                                            }
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <p className="mt-4 flex text-sm text-black dark:text-gray-400 hover:underline cursor-pointer">
                        <span className="font-semibold mx-1">
                            {stats.totalFiles}
                        </span>
                        upload{stats.totalFiles !== 1 && "s"} with a size of{" "}
                        <span className="font-semibold mx-1">
                            {stats.totalSize.value}
                        </span>
                        {stats.totalSize.unit}
                    </p>
                </Fade>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
    const loggedIn = await noRedirectIsLoggedIn(req.cookies.access);
    if (loggedIn) {
        res.setHeader("location", "/dashboard");
        res.statusCode = 302;
        res.end();
    }

    const r = await fetch(`${process.env.SERVER_API_URL}/api/statistics/basic`);
    const response = await r.json();

    return {
        props: { stats: response.data },
    };
};

export default Login;
