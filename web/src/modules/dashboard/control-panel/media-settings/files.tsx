import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import { axios } from "@lib/axiosClient";
import { useSettingsStore } from "@global-stores/useSettingsStore";
import { updateFilesPerPageSchema } from "@sharex-server/common";
import useEnv from "@hooks/useEnv";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";
import BottomPart from "@components/SettingSection/BottomPart";
import SaveButton from "@components/SettingSection/SaveButton";

import Label from "@ui/form/Label";
import Input from "@ui/form/Input";
import Error from "@ui/form/Error";

const FilesSettingsModule = (): JSX.Element => {
    const { settings, updateSettings } = useSettingsStore();
    const env = useEnv();

    return (
        <SettingSection
            title="File Settings"
            subtitle="Change how files are displayed on the site."
        >
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={updateFilesPerPageSchema}
                initialValues={{
                    files_per_page: settings.media_settings?.files.per_page,
                }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    const r = await axios.post(
                        `${env.api_url}/api/settings/media/file`,
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
                                <Label>Files per page</Label>
                                <Field
                                    name="files_per_page"
                                    required
                                    as={Input}
                                    type="number"
                                    min={1}
                                />
                                <Error error={errors.files_per_page} />
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

export default FilesSettingsModule;
