import * as yup from "yup";

import { isPermission } from "../api-tokens/index";

export const updateAPIKeySchema = yup.object().shape({
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
