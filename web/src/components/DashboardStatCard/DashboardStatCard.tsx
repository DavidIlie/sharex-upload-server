import React from "react";
import Icon from "./Icon";

interface DashboardStatCardProps {
    type: "file" | "image" | "text" | "metric";
    value: number | string;
    unit?: string;
    title: string;
}

const DashboardStatCard = ({
    type,
    value,
    title,
    unit,
}: DashboardStatCardProps): JSX.Element => {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 dark:bg-opacity-50 border-2 border-gray-200 dark:border-gray-800 rounded-lg hoverItem duration-200">
            <div className="flex justify-evenly items-center space-x-8">
                <div>
                    <div className="uppercase text-sm text-gray-800 dark:text-dark-gray-300">
                        {title}
                    </div>
                    {type === "metric" ? (
                        <div className="mt-1 text-5xl font-bold text-gray-900 dark:text-dark-gray-200">
                            {value}
                            <span className="ml-1 text-xl">{unit}</span>
                        </div>
                    ) : (
                        <div className="mt-1 text-5xl font-bold text-gray-900 dark:text-dark-gray-200">
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
