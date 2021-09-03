import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
    ogPassword: yup.string().min(5).max(1000).required(),
    newPassword: yup
        .string()
        .min(5)
        .max(1000)
        .notOneOf(
            [yup.ref("ogPassword"), null],
            "This cannot be your original password!"
        )
        .required(),
    confirmNewPassword: yup
        .string()
        .min(5)
        .max(1000)
        .oneOf([yup.ref("newPassword"), null], "Passwords must match!")
        .required(),
});
