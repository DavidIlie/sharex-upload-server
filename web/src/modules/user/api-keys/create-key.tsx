import { Field, Form, Formik, FieldArray, FieldArrayRenderProps } from "formik";
import toast from "react-hot-toast";
import { useState } from "react";

import useSettings from "@hooks/useSettings";
import { createAPIKeySchema, getPermissions } from "@sharex-server/common";
import { axios } from "@lib/axiosClient";
import useEnv from "@hooks/useEnv";
import { queryClient } from "@lib/queryClient";

import Modal from "@ui/Modal";
import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";
import Radio from "@ui/form/Radio";

const CreateKeyModule = (): JSX.Element => {
    const [openKeyModal, setOpenKeyModal] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string>("");
    const handleOpenKeyModal = () => setOpenKeyModal(!openKeyModal);

    const settings = useSettings();
    const env = useEnv();

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
        <>
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
                        permissions: [
                            "image:upload",
                            "text:upload",
                            "file:upload",
                        ],
                    }}
                    onSubmit={async (data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);

                        const r = await axios.post(
                            `${env.api_url}/api/keys`,
                            data
                        );
                        const response = await r.data;

                        if (r.status === 200) {
                            toast.success("Token added successfully!");
                            setApiKey(response.token);
                            handleOpenKeyModal();
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
            <Modal
                isOpen={openKeyModal}
                updateModalState={handleOpenKeyModal}
                title="API Key"
            >
                <>
                    <div className="mt-2">
                        <h1 className="text-gray-800 dark:text-gray-200">
                            Please copy your new API token. For your security,
                            it won't be shown again.
                        </h1>
                        <textarea
                            value={apiKey}
                            className="dark:bg-gray-900 w-full mt-2 rounded"
                        />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 dark:text-green-900 bg-green-100 dark:bg-green-500 border border-transparent rounded-md hover:bg-green-200 dark:hover:bg-green-600 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={handleOpenKeyModal}
                        >
                            Done
                        </button>
                    </div>
                </>
            </Modal>
        </>
    );
};

export default CreateKeyModule;
