import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "next-themes";

import { api_url } from "@lib/constants";
import { useSettingsStore } from "@global-stores/useSettingsStore";
import { updateSettingsSchema } from "@sharex-server/common";
import { axios } from "@lib/axiosClient";
import ToggleColorMode from "@hooks/ToggleColorMode";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Select from "@ui/form/Select";
import Error from "@ui/form/Error";
import SavedText from "@components/SettingSection/SavedText";

const GeneralSettingsModule = (): JSX.Element => {
    const { settings, updateSettings } = useSettingsStore();
    const { resolvedTheme } = useTheme();
    const updateTheme = ToggleColorMode();
    const [finished, setFinished] = useState<boolean>(false);

    return (
        <SettingSection
            title="General Site Settings"
            subtitle="Change the general global site settings."
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={updateSettingsSchema}
                initialValues={{
                    name: settings.name,
                    default_theme: settings.default_theme,
                }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    const r = await axios.post(`${api_url}/api/settings`, data);
                    const response = await r.data;

                    updateSettings(response);
                    setSubmitting(false);
                    setFinished(true);

                    if (resolvedTheme !== response.default_theme) updateTheme();

                    setInterval(() => {
                        setFinished(false);
                    }, 1500);
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <TopPart>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Site Name</Label>
                                <Field name="name" required as={Input} />
                                <Error error={errors.name} />
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
                                <Error error={errors.default_theme} />
                            </div>
                        </TopPart>
                        <BottomPart>
                            {finished && (
                                <Fade duration={100}>
                                    <SavedText />
                                </Fade>
                            )}
                            <SaveButton disabled={isSubmitting} />
                        </BottomPart>
                    </Form>
                )}
            </Formik>
        </SettingSection>
    );
};

export default GeneralSettingsModule;
