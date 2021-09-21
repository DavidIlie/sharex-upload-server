import { formatDistance } from "date-fns";

import type { TokenProps } from "../../types/Token";

interface APIKeyCardProps {
    data: TokenProps;
}

const APIKeyCard = ({ data }: APIKeyCardProps): JSX.Element => {
    return (
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl flex justify-between w-full hoverItem duration-200">
            <h1>{data.name}</h1>
            <div className="flex items-center gap-4">
                {data.lastUsed !== new Date("1970-01-01T00:00:00.000Z") && (
                    <h1 className="text-sm text-gray-400">
                        Last used{" "}
                        {formatDistance(new Date(data.lastUsed), Date.now(), {
                            addSuffix: true,
                        })}
                    </h1>
                )}

                <div className="flex items-center gap-4">
                    <h1 className="cursor-pointer">Permissions</h1>
                    <h1 className="text-red-500 font-semibold cursor-pointer">
                        Delete
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default APIKeyCard;
