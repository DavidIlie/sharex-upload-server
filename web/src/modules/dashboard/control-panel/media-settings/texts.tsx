import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import { api_url } from "@lib/constants";
import { axios } from "@lib/axiosClient";
import { useSettingsStore } from "@global-stores/useSettingsStore";
import { updateTextsPerPageSchema } from "@sharex-server/common";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";

const TextsSettignsModule = (): JSX.Element => {
    const { settings, updateSettings } = useSettingsStore();

    return (
        <SettingSection
            title="Texts Settings"
            subtitle="Change how texts are displayed on the site."
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={updateTextsPerPageSchema}
                initialValues={{
                    texts_per_page: settings.media_settings?.texts.per_page,
                }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    const r = await axios.post(
                        `${api_url}/api/settings/media/text`,
                        data
                    );
                    const response = await r.data;

                    if (r.status === 200) {
                        toast.success("Updated successfully!");

                        updateSettings(response);
                        setSubmitting(false);
                    } else {
                        toast.error(response.message);
                    }
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <TopPart>
                            <div className="col-span-6 sm:col-span-4">
                                <Label>Texts per page</Label>
                                <Field
                                    name="texts_per_page"
                                    required
                                    as={Input}
                                    type="number"
                                    min={1}
                                />
                                <Error error={errors.texts_per_page} />
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

export default TextsSettignsModule;
