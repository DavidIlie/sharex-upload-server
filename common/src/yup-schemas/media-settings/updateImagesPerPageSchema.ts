import * as yup from "yup";

export const updateImagesPerPageSchema = yup.object().shape({
    images_per_page: yup.number().min(1, "This must be at least 1."),
});
