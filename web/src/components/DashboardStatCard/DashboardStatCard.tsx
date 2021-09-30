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
        <div className="p-6 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 border-2 border-gray-200 dark:border-gray-800 rounded-lg hoverItem duration-200">
            <div className="flex justify-evenly items-center space-x-8">
                <div>
                    <div className="uppercase text-sm text-gray-800 dark:text-dark-gray-300">
                        {title}
                    </div>
                    {isLoading ? (
                        <div className="animate-pulse flex-1 space-y-4 py-1 mt-1">
                            <div className="flex items-center gap-4">
                                <div className="h-10 bg-gray-800 rounded w-full" />
                                {type === "metric" && (
                                    <span className="h-10 bg-gray-800 rounded w-full" />
                                )}
                            </div>
                        </div>
                    ) : type === "metric" ? (
                        <div className="mt-1 sm:text-5xl text-3xl font-bold text-gray-900 dark:text-dark-gray-200">
                            {value}
                            <span className="ml-1 text-xl">{unit}</span>
                        </div>
                    ) : (
                        <div className="mt-1 sm:text-5xl text-3xl font-bold text-gray-900 dark:text-dark-gray-200">
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
