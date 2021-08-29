import * as yup from "yup";

export const updateSettingsSchema = yup.object().shape({
    name: yup.string().min(3).max(30).required(),
    default_theme: yup.string().is(["dark", "light"]).required(),
});
