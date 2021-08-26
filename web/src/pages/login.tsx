import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { Field, Form, Formik } from "formik";

import { loginSchema, SettingsType } from "@sharex-server/common";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Radio from "@ui/form/Radio";
import SubmitButton from "@ui/form/SubmitButton";
import { useState } from "react";
import { isLoggedIn } from "@lib/isLoggedIn";
import { GetServerSideProps } from "next";

interface LoginProps {
    settings: SettingsType;
    api_url: string;
}

const Login = ({ settings, api_url }: LoginProps): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState<boolean | string>(false);
    const router = useRouter();

    return (
        <>
            <NextSeo title="Login" />
            <div className="h-screen flex flex-col justify-center items-center">
                <Fade direction="up" cascade>
                    <div className="text-3xl font-medium">
                        <a href="/login">{settings.name}</a>
                    </div>
                    <div className="w-full sm:max-w-md mt-3 px-6 py-4 border-2 bg-dark-gray-800 border-gray-900 shadow-md overflow-hidden sm:rounded-lg">
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

                                const loginRequest = await fetch(
                                    `${api_url}/api/user/auth/login`,
                                    {
                                        method: "POST",
                                        body: JSON.stringify(data),
                                        credentials: "include",
                                        headers: {
                                            "Content-type": "application/json",
                                        },
                                    }
                                );

                                const response = await loginRequest.json();

                                if (loginRequest.status !== 200) {
                                    setErrorMessage(response.message);
                                } else {
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
                </Fade>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
    const loggedIn = await isLoggedIn(req.cookies.access);
    if (loggedIn) {
        res.setHeader("location", "/dashboard");
        res.statusCode = 302;
        res.end();
    }
    return {
        props: {
            api_url: process.env.API_URL,
        },
    };
};

export default Login;
