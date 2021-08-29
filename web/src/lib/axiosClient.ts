import { default as realAxios } from "axios";

export const axios = realAxios.create({
    withCredentials: true,
});
