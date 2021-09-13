import * as yup from "yup";

export const createAPIKeySchema = yup.object().shape({
    name: yup
        .string()
        .min(4, "Name can't be less than 4 characters.")
        .max(32, "Name can't be more than 32 characters.")
        .required(),
    permissions: yup.array().of(yup.string()),
});
