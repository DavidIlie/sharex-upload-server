import { default as realAxios } from "axios";

export const axios = realAxios.create({
    withCredentials: true,
    validateStatus: function (status) {
        return status >= 200 && status <= 401;
    },
});
