import * as yup from "yup";

export const updateProfileSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "Name must be at least 3 characters.")
        .max(100, "Name must be at most 10 characters.")
        .required(),
    email: yup.string().email().min(3).max(500).required(),
});
