import { useQuery } from "react-query";

import useEnv from "@hooks/useEnv";

import DashboardStatCard from "@components/DashboardStatCard";

interface DataTypes {
    data: {
        imageCount: number;
        fileCount: number;
        textCount: number;
        totalSize: {
            value: string;
            unit: string;
        };
    };
}

const StatisticsModule = ({ admin }: { admin: boolean }): JSX.Element => {
    const env = useEnv();

    const { isLoading, data: response } = useQuery<DataTypes>(
        admin
            ? `${env.api_url}/api/statistics/admin`
            : `${env.api_url}/api/statistics`,
        { refetchOnWindowFocus: true }
    );

    return (
        <div className="max-w-7xl mx-auto px-2 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!isLoading && (
                <>
                    <DashboardStatCard
                        type="image"
                        value={response!.data.imageCount}
                        title="Images"
                    />
                    <DashboardStatCard
                        type="file"
                        value={response!.data.fileCount}
                        title="Files"
                    />
                    <DashboardStatCard
                        type="text"
                        value={response!.data.textCount}
                        title="Text Files"
                    />
                    <DashboardStatCard
                        type="metric"
                        value={response!.data.totalSize.value}
                        title="Used Disk Space"
                        unit={response!.data.totalSize.unit}
                    />
                </>
            )}
        </div>
    );
};

export default StatisticsModule;
