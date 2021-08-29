import * as yup from "yup";

export const updateSettingsSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "Name must be at least 3 characters.")
        .max(30, "Name must be at most 30 characters.")
        .required(),
    default_theme: yup.string().is(["dark", "light"]).required(),
});
