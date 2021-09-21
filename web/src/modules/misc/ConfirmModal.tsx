import Modal from "@ui/Modal";

interface Types {
    isOpen: boolean;
    updateModalState: () => void;
    successFunction: () => void;
}

const ConfirmModal = ({
    isOpen,
    updateModalState,
    successFunction,
}: Types): JSX.Element => {
    return (
        <Modal
            isOpen={isOpen}
            updateModalState={updateModalState}
            title="Are you sure?"
        >
            <>
                <div className="mt-2">
                    <h1 className="text-gray-800 dark:text-gray-300">
                        There is no going back once you do this.
                    </h1>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-gray-100 bg-blue-100 dark:bg-gray-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-dark-gray-900 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={updateModalState}
                    >
                        Nevermind
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 dark:text-gray-100 bg-red-300 dark:bg-red-600 border border-transparent rounded-md hover:bg-red-4D00 dark:hover:bg-red-700 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                            successFunction();
                            updateModalState();
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </>
        </Modal>
    );
};

export default ConfirmModal;
