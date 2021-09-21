import ConfirmModal from "@modules/misc/ConfirmModal";
import { formatDistance } from "date-fns";
import { useState } from "react";

import type { TokenProps } from "../../types/Token";

import PermissionsModal from "./PermissionsModal";

interface APIKeyCardProps {
    data: TokenProps;
}

const APIKeyCard = ({ data }: APIKeyCardProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const updateModalState = () => setIsOpen(!isOpen);

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const updateConfirmDeleteState = () => setConfirmDelete(!confirmDelete);

    const deleteToken = async () => {
        console.log("yo");
    };

    return (
        <>
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl flex justify-between w-full hoverItem duration-200">
                <h1>{data.name}</h1>
                <div className="flex items-center gap-4">
                    {(data.lastUsed as any) !== "1970-01-01T00:00:00.000Z" && (
                        <h1 className="text-sm text-gray-400">
                            Last used{" "}
                            {formatDistance(
                                new Date(data.lastUsed),
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
