import React from "react";
import Icon from "./Icon";

interface DashboardStatCardProps {
    type: "file" | "image" | "text" | "metric";
    value?: number | string;
    unit?: string;
    title: string;
    isLoading: boolean;
}

const DashboardStatCard = ({
    type,
    value,
    title,
    unit,
    isLoading,
}: DashboardStatCardProps): JSX.Element => {
    return (
        <div className="p-6 duration-200 bg-gray-100 border-2 border-gray-200 rounded-lg dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 dark:border-gray-800 hoverItem">
            <div className="flex items-center space-x-8 justify-evenly">
                <div>
                    <div className="text-sm text-gray-800 uppercase dark:text-dark-gray-300">
                        {title}
                    </div>
                    {isLoading ? (
                        <div className="flex-1 py-1 mt-1 space-y-4 animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-full h-10 bg-gray-800 rounded" />
                                {type === "metric" && (
                                    <span className="w-full h-10 bg-gray-800 rounded" />
                                )}
                            </div>
                        </div>
                    ) : type === "metric" ? (
                        <div className="mt-1 text-3xl font-bold text-gray-900 sm:text-5xl dark:text-dark-gray-200">
                            {value}
                            <span className="ml-1 text-xl">{unit}</span>
                        </div>
                    ) : (
                        <div className="mt-1 text-3xl font-bold text-gray-900 sm:text-5xl dark:text-dark-gray-200">
                            {value}
                        </div>
                    )}
                </div>
                <Icon type={type} />
            </div>
        </div>
    );
};

export default DashboardStatCard;
