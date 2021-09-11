import * as yup from "yup";

export const updateTextsPerPageSchema = yup.object().shape({
    texts_per_page: yup.number().min(1, "This must be at least 1."),
});
