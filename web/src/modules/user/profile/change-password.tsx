import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import { changePasswordSchema } from "@sharex-server/common";
import { axios } from "@lib/axiosClient";
import useEnv from "@hooks/useEnv";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";

const ChangePasswordModule = (): JSX.Element => {
    const env = useEnv();

    return (
        <SettingSection
            title="Update Password"
            subtitle="Change your password in case you don't remember it. Make sure that it's safe as well."
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={changePasswordSchema}
                initialValues={{
                    ogPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                }}
                onSubmit={async (
                    data,
                    { setSubmitting, setFieldError, resetForm }
                ) => {
                    setSubmitting(true);

                    const r = await axios.post(
                        `${env.api_url}/api/user/password`,
                        data
                    );
                    const response = await r.data;

                    if (r.status === 200) {
                        toast.success("Updated successfully!");
                    } else if (r.status === 401) {
                        setFieldError("ogPassword", response.message);
                    } else if (r.status === 304) {
                        setFieldError("newPassword", response.message);
                        setFieldError("confirmNewPassword", response.message);
                    } else {
                        toast.error(response.message);
                    }

                    resetForm();
                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <TopPart>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Original Password</Label>
                                <Field
                                    name="ogPassword"
                                    required
                                    type="password"
                                    as={Input}
                                />
                                <Error error={errors.ogPassword} />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>New Password</Label>
                                <Field
                                    name="newPassword"
                                    required
                                    type="password"
                                    as={Input}
                                />
                                <Error error={errors.newPassword} />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Confirm New Password</Label>
                                <Field
                                    name="confirmNewPassword"
                                    required
                                    type="password"
                                    as={Input}
                                />
                                <Error error={errors.confirmNewPassword} />
                            </div>
                        </TopPart>
                        <BottomPart>
                            <SaveButton isSubmitting={isSubmitting} />
                        </BottomPart>
                    </Form>
                )}
            </Formik>
        </SettingSection>
    );
};

export default ChangePasswordModule;
