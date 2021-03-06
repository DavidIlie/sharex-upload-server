import { Field, Form, Formik, FieldArray, FieldArrayRenderProps } from "formik";
import toast from "react-hot-toast";
import { queryClient } from "@lib/queryClient";

import { getPermissions, updateAPIKeySchema } from "@sharex-server/common";
import { axios } from "@lib/axiosClient";
import useEnv from "@hooks/useEnv";

import Modal from "@ui/Modal";

import Radio from "@ui/form/Radio";
import Error from "@ui/form/Error";

interface Types {
    isOpen: boolean;
    updateModalState: () => void;
    id: string;
    permissions: Array<string>;
}

const PermissionsModal = ({
    isOpen,
    updateModalState,
    id,
    permissions,
}: Types): JSX.Element => {
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

    const staticPermissions = getPermissions();

    return (
        <Modal
            isOpen={isOpen}
            updateModalState={updateModalState}
            title="Permissions"
        >
            <>
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={updateAPIKeySchema}
                    initialValues={{
                        permissions: permissions,
                    }}
                    onSubmit={async (data, { setSubmitting }) => {
                        setSubmitting(true);

                        const r = await axios.post(
                            `${env.api_url}/api/keys/update/${id}`,
                            data
                        );
                        const response = await r.data;

                        if (r.status === 200) {
                            toast.success("Updated successfully!");
                            queryClient.refetchQueries(
                                `${env.api_url}/api/keys`
                            );
                            updateModalState();
                        } else {
                            toast.error(response.message);
                        }

                        setSubmitting(false);
                    }}
                >
                    {({ errors, isSubmitting, values }) => (
                        <Form>
                            <div className="mt-4">
                                <div className="col-span-6 sm:col-span-4">
                                    <div className="grid grid-cols-1 gap-4 mt-2 ml-3 sm:grid-cols-2 md:grid-cols-3">
                                        <FieldArray
                                            name="permissions"
                                            render={(arrayHelpers) =>
                                                staticPermissions.map(
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
                                        <div className="pt-2" />
                                        <Error error={errors.permissions} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 duration-150 bg-blue-100 border border-transparent rounded-md dark:text-gray-100 dark:bg-dark-gray-900 hover:bg-blue-200 dark:hover:bg-dark-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={updateModalState}
                                >
                                    Nevermind
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 duration-150 bg-blue-100 border border-transparent rounded-md dark:text-gray-100 dark:bg-gray-900 hover:bg-blue-200 dark:hover:bg-dark-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                >
                                    {isSubmitting ? "Updating" : "Update"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        </Modal>
    );
};

export default PermissionsModal;
