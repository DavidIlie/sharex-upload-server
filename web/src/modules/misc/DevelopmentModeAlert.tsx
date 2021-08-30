import { useQuery } from "react-query";
import { useRouter } from "next/router";

import User from "../../types/User";
import { is_dev } from "@lib/constants";

import AlertBanner from "@components/AlertBanner";

const DevelopmentModeAlertModule = (): JSX.Element => {
    const { isLoading, data: user } = useQuery<User>("/api/user");
    const router = useRouter();
    const path = router.pathname;
    return !isLoading &&
        is_dev &&
        path.startsWith("/dashboard" || "/user") &&
        user?.isAdmin ? (
        <AlertBanner
            storageName="dismissDevelopmentAlert"
            color="red"
            title="App is in development mode!"
            message="If you don't know what you are doing, please switch to production mode!"
        />
    ) : (
        <div className="hidden" />
    );
};

export default DevelopmentModeAlertModule;
