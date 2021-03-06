import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface AlertBannerProps {
    storageName: string;
    color: "red" | "green"; //add more colors if you want lol;
    title: string;
    message: string;
}

const AlertBanner = ({
    storageName,
    color,
    title,
    message,
}: AlertBannerProps): JSX.Element => {
    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
    const alreadyChecked = localStorage.getItem(storageName);
    const HandleClick = () => {
        localStorage.setItem(storageName, "true");
        forceUpdate();
    };
    return alreadyChecked !== "true" ? (
        <div
            className={`bg-gray-200 dark:bg-gray-900 flex justify-center items-center p-2 text-${color}-600 dark:text-${color}-400 gap-1`}
        >
            <h1>
                <span
                    className={`font-bold text-${color}-600 dark:text-${color}-500`}
                >
                    {title}
                </span>{" "}
                {message}
            </h1>
            <div
                className="p-2 duration-150 rounded cursor-pointer hover:bg-dark-gray-100 dark:hover:bg-dark-gray-900"
                onClick={HandleClick}
            >
                <AiOutlineClose />
            </div>
        </div>
    ) : (
        <div className="hidden" />
    );
};

export default AlertBanner;
