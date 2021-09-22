import { Field, Form, Formik, FieldArray, FieldArrayRenderProps } from "formik";

import { getPermissions } from "@sharex-server/common";

import Modal from "@ui/Modal";

import Radio from "@ui/form/Radio";
import Error from "@ui/form/Error";

interface Types {
    isOpen: boolean;
    updateModalState: () => void;
    permissions: Array<string>;
}

const PermissionsModal = ({
    isOpen,
    updateModalState,
    permissions,
}: Types): JSX.Element => {
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
                    initialValues={{
                        permissions: permissions,
                    }}
                    onSubmit={async (data, { setSubmitting }) => {
                        setSubmitting(true);
                        console.log(data);

                        setSubmitting(false);
                    }}
                >
                    {({ errors, isSubmitting, values }) => (
                        <Form>
                            <div className="mt-4">
                                <div className="col-span-6 sm:col-span-4">
                                    <div className="ml-3 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-gray-100 bg-blue-100 dark:bg-dark-gray-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-dark-gray-800 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={updateModalState}
                                >
                                    Nevermind
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-gray-100 bg-blue-100 dark:bg-gray-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-dark-gray-800 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
