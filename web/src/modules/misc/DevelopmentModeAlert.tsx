import { is_dev } from "@lib/constants";
import useUser from "@hooks/useUser";

import AlertBanner from "@components/AlertBanner";

const DevelopmentModeAlertModule = (): JSX.Element => {
    const user = useUser();

    return user?.isAdmin && is_dev ? (
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
