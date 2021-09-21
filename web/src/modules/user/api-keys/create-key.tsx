import { Field, Form, Formik, FieldArray, FieldArrayRenderProps } from "formik";
import toast from "react-hot-toast";

import useSettings from "@hooks/useSettings";
import { createAPIKeySchema, getPermissions } from "@sharex-server/common";
import { axios } from "@lib/axiosClient";
import { api_url } from "@lib/constants";
import { queryClient } from "@lib/queryClient";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";
import Radio from "@ui/form/Radio";

const CreateKeyModule = (): JSX.Element => {
    const settings = useSettings();

    const APITypesController = (
        name: string,
        permissions: Array<string>,
        arrayHelpers: FieldArrayRenderProps
    ) => {
        if (permissions.includes(name)) {
            arrayHelpers.remove(permissions.indexOf(name));
        } else {
            arrayHelpers.push(name);
        }
    };

    const permissions = getPermissions();

    return (
        <SettingSection
            title="Create API Key"
            subtitle={`API keys allow third-party services to authenticate with ${settings.name} on your behalf.`}
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={createAPIKeySchema}
                initialValues={{
                    name: "",
                    permissions: ["image:upload", "text:upload", "file:upload"],
                }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    const r = await axios.post(`${api_url}/api/keys`, data);
                    const response = await r.data;

                    if (r.status === 200) {
                        toast.success("Token added successfully!");
                        queryClient.refetchQueries("/api/keys");
                    } else {
                        toast.error(response.message);
                    }

                    resetForm();
                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting, values }) => (
                    <Form>
                        <TopPart>
                            <div className="col-span-6 sm:col-span-4">
                                <pre>{JSON.stringify(values)}</pre>
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Token Name</Label>
                                <Field name="name" required as={Input} />
                                <Error error={errors.name} />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Permissions:</Label>
                                <div className="ml-3 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FieldArray
                                        name="permissions"
                                        render={(arrayHelpers) =>
                                            permissions.map(
                                                (permission, index) => (
                                                    <Field
                                                        label={permission}
                                                        key={index}
                                                        onClick={() =>
                                                            APITypesController(
                                                                permission,
                                                                values.permissions,
                                                                arrayHelpers
                                                            )
                                                        }
                                                        checked={values.permissions.includes(
                                                            permission as never
                                                        )}
                                                        as={Radio}
                                                    />
                                                )
                                            )
                                        }
                                    />
                                </div>
                                <div className="pt-2" />
                                <Error error={errors.permissions} />
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

export default CreateKeyModule;
