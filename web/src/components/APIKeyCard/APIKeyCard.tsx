import { axios } from "@lib/axiosClient";
import ConfirmModal from "@modules/misc/ConfirmModal";
import { formatDistance } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";

import { queryClient } from "@lib/queryClient";
import type { TokenProps } from "../../types/Token";
import useEnv from "@hooks/useEnv";

import PermissionsModal from "./PermissionsModal";

interface APIKeyCardProps {
    data?: TokenProps;
    skeleton?: boolean;
}

const APIKeyCard = ({ data, skeleton }: APIKeyCardProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const updateModalState = () => setIsOpen(!isOpen);

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const updateConfirmDeleteState = () => setConfirmDelete(!confirmDelete);

    const env = useEnv();

    const deleteToken = async () => {
        const deleteTokenPromise = new Promise<string>(
            async (resolve, reject) => {
                const r = await axios.post(
                    `${env.api_url}/api/keys/delete/${data!.id}`
                );
                const response = r.data;
                if (r.status === 200) {
                    resolve(response.message);
                    queryClient.refetchQueries(`${env.api_url}/api/keys`);
                } else {
                    reject(response.message);
                }
            }
        );

        toast.promise(deleteTokenPromise, {
            loading: "Loading",
            success: "Deleted successfully!",
            error: "Error when fetching!",
        });
    };

    return skeleton ? (
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl flex justify-between">
            <div className="animate-pulse flex-1 space-y-4 py-1">
                <div className="flex items-center gap-4">
                    <div className="h-4 bg-dark-gray-900 rounded w-1/3" />
                    <div className="h-4 bg-dark-gray-900 rounded w-1/3" />
                    <div className="h-4 bg-dark-gray-900 rounded w-1/3" />
                </div>
            </div>
        </div>
    ) : (
        <>
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl flex justify-between">
                <h1 className="w-72">{data!.name}</h1>
                <div className="flex flex-wrap items-center sm:gap-4 gap-1">
                    {(data!.lastUsed as any) !== "1970-01-01T00:00:00.000Z" && (
                        <h1 className="text-sm text-gray-400">
                            Last used{" "}
                            {formatDistance(
                                new Date(data!.lastUsed),
                                Date.now(),
                                {
                                    addSuffix: true,
                                }
                            )}
                        </h1>
                    )}

                    <div className="flex items-center gap-6">
                        <h1
                            className="cursor-pointer"
                            onClick={() => updateModalState()}
                        >
                            Permissions
                        </h1>
                        <h1
                            className="text-red-500 font-semibold cursor-pointer"
                            onClick={() => updateConfirmDeleteState()}
                        >
                            Delete
                        </h1>
                    </div>
                </div>
            </div>
            <PermissionsModal
                isOpen={isOpen}
                updateModalState={updateModalState}
                id={data!.id}
                permissions={data!.permissions}
            />
            <ConfirmModal
                isOpen={confirmDelete}
                updateModalState={updateConfirmDeleteState}
                successFunction={deleteToken}
            />
        </>
    );
};

export default APIKeyCard;
