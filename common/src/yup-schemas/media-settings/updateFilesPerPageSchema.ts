import * as yup from "yup";

export const updateFilesPerPageSchema = yup.object().shape({
    files_per_page: yup.number().min(1, "This must be at least 1."),
});
