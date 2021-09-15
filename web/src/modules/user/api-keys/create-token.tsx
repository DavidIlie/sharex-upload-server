import { Field, Form, Formik, FieldArray, FieldArrayRenderProps } from "formik";

import useSettings from "@hooks/useSettings";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";
import Radio from "@ui/form/Radio";

const CreateTokenModule = (): JSX.Element => {
    const settings = useSettings();

    const APITypesController = (
        name: string,
        types: Array<string>,
        arrayHelpers: FieldArrayRenderProps
    ) => {
        if (types.includes(name)) {
            arrayHelpers.remove(types.indexOf(name));
        } else {
            arrayHelpers.push(name);
        }
    };

    return (
        <SettingSection
            title="Create API Key"
            subtitle={`API keys allow third-party services to authenticate with ${settings.name} on your behalf.`}
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    name: "",
                    types: [],
                }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    console.log(data);

                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting, values }) => (
                    <Form>
                        <TopPart>
                            <div className="col-span-6 sm:col-span-4">
                                <h1>{JSON.stringify(values)}</h1>
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
                                        name="types"
                                        render={(arrayHelpers) => (
                                            <>
                                                <Field
                                                    label="image:view"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "image:view",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:view"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "file:view",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:view"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "text:view",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="image:upload"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "image:upload",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:upload"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "file:upload",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:upload"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "text:upload",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="image:list"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "image:list",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:list"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "file:list",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:list"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "text:list",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="image:delete"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "image:delete",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:delete"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "file:delete",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:delete"
                                                    onClick={() =>
                                                        APITypesController(
                                                            "text:delete",
                                                            values.types,
                                                            arrayHelpers
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
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

export default CreateTokenModule;
