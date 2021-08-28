import React from "react";
import Icon from "./Icon";

interface DashboardStatCardProps {
    type: "total" | "file" | "image" | "text" | "metric";
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
        <div className="p-6 bg-gray-700 bg-opacity-25 rounded-lg hoverItem duration-200">
            <div className="flex justify-center items-center space-x-8">
                <div>
                    <div className="uppercase text-sm text-dark-gray-300">
                        {title}
                    </div>
                    {type === "metric" ? (
                        <div className="mt-1 text-5xl font-bold text-dark-gray-200">
                            {value}
                            <span className="ml-1 text-xl">{unit}</span>
                        </div>
                    ) : (
                        <div className="mt-1 text-5xl font-bold text-dark-gray-200">
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
