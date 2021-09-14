import { Field, Form, Formik, FieldArray } from "formik";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";
import Radio from "@ui/form/Radio";

const CreateTokenModule = (): JSX.Element => {
    return (
        <SettingSection
            title="Create API Key"
            subtitle="API keys allow third-party services to authenticate with this application on your behalf."
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
                                                        arrayHelpers.push(
                                                            "image:view"
                                                        )
                                                    }
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:view"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:view"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="image:upload"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:upload"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:upload"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="image:list"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:list"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:list"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="image:delete"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="file:delete"
                                                    as={Radio}
                                                />
                                                <Field
                                                    label="text:delete"
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
