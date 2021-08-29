import { Field, Form, Formik } from "formik";

import { api_url } from "@lib/constants";
import { useSettingsStore } from "@global-stores/useSettingsStore";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Select from "@ui/form/Select";
import SavedText from "@components/SettingSection/SavedText";

const GeneralSettingsModule = (): JSX.Element => {
    const { settings, updateSettings } = useSettingsStore();

    return (
        <SettingSection
            title="General Site Settings"
            subtitle="Change the general global site settings."
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    name: settings.name,
                    default_theme: settings.default_theme,
                }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    const r = await fetch(`${api_url}/api/settings`, {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-type": "application/json",
                        },
                    });
                    const response = await r.json();

                    updateSettings(response);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <TopPart>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Site Name</Label>
                                <Field name="name" required as={Input} />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Default Site Theme</Label>
                                <Field
                                    name="default_theme"
                                    required
                                    as={Select}
                                >
                                    <option
                                        value="dark"
                                        selected={
                                            settings.default_theme === "dark"
                                        }
                                    >
                                        Dark Mode
                                    </option>
                                    <option
                                        value="light"
                                        selected={
                                            settings.default_theme === "light"
                                        }
                                    >
                                        Light Mode
                                    </option>
                                </Field>
                            </div>
                        </TopPart>
                        <BottomPart>
                            <SavedText />
                            <SaveButton disabled={isSubmitting} />
                        </BottomPart>
                    </Form>
                )}
            </Formik>
        </SettingSection>
    );
};

export default GeneralSettingsModule;
