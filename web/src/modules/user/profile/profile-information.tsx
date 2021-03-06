import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import { axios } from "@lib/axiosClient";
import useEnv from "@hooks/useEnv";
import { useUserStore } from "@global-stores/useUserStore";
import { updateProfileSchema } from "@sharex-server/common";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";

const ProfileInformationModule = (): JSX.Element => {
    const { user, updateUser } = useUserStore();
    const env = useEnv();

    return (
        <SettingSection
            title="Profile Information"
            subtitle="Update your account's profile information and email address."
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{ name: user.name, email: user!.email }}
                validationSchema={updateProfileSchema}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    try {
                        const r = await axios.post(
                            `${env.api_url}/api/user/profile`,
                            data
                        );
                        const response = await r.data;

                        if (r.status === 200) {
                            toast.success("Updated successfully!");
                            updateUser(response);
                            setSubmitting(true);
                        } else {
                            toast.error(response.message);
                        }
                    } catch (error: any) {
                        toast.error(error.message);
                    }
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <TopPart>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Name</Label>
                                <Field name="name" required as={Input} />
                                <Error error={errors.name} />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Email</Label>
                                <Field
                                    name="email"
                                    required
                                    type="email"
                                    as={Input}
                                />
                                <Error error={errors.email} />
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

export default ProfileInformationModule;
