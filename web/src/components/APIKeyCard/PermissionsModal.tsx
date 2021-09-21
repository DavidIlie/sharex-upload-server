import toast from "react-hot-toast";

import Modal from "@ui/Modal";

interface Types {
    isOpen: boolean;
    updateModalState: () => void;
}

const PermissionsModal = ({ isOpen, updateModalState }: Types): JSX.Element => {
    return (
        <Modal
            isOpen={isOpen}
            updateModalState={updateModalState}
            title="Permissions"
        >
            <>
                <div className="mt-2">
                    <h1>thing should go here</h1>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-gray-100 bg-blue-100 dark:bg-dark-gray-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-dark-gray-800 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={updateModalState}
                    >
                        Nevermind
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-gray-100 bg-blue-100 dark:bg-gray-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-dark-gray-800 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => toast("coming soon!", { icon: "💻" })}
                    >
                        Update
                    </button>
                </div>
            </>
        </Modal>
    );
};

export default PermissionsModal;
