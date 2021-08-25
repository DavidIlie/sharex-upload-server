import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email().min(3).max(500).required(),
    password: yup.string().min(5).max(1000).required(),
    remember: yup.boolean().required(),
});
