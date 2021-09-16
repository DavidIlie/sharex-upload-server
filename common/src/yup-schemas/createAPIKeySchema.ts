import * as yup from "yup";

import { isPermission } from "../api-tokens/index";

export const createAPIKeySchema = yup.object().shape({
    name: yup
        .string()
        .min(4, "Name can't be less than 4 characters.")
        .max(32, "Name can't be more than 32 characters.")
        .required(),
    permissions: yup
        .array()
        .of(
            yup
                .string()
                .test("valid", "This is not a valid permission!", (val) => {
                    if (isPermission(val)) return true;
                    return false;
                })
        )
        .defined()
        .required()
        .min(1, "You must pick at least one option."),
});
