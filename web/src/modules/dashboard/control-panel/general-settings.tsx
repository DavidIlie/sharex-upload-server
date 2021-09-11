import { Field, Form, Formik } from "formik";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

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

const GeneralSettingsModule = (): JSX.Element => {
    const { settings, updateSettings } = useSettingsStore();
    const { resolvedTheme } = useTheme();
    const updateTheme = ToggleColorMode();

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

                    if (r.status === 200) {
                        toast.success("Updated successfully!");

                        updateSettings(response);
                        setSubmitting(false);

                        if (resolvedTheme !== response.default_theme)
                            updateTheme();
                    } else {
                        toast.error(response.message);
                    }
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
                            <SaveButton isSubmitting={isSubmitting} />
                        </BottomPart>
                    </Form>
                )}
            </Formik>
        </SettingSection>
    );
};

export default GeneralSettingsModule;
