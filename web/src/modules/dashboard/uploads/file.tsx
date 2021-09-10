import toast from "react-hot-toast";

import Modal from "@ui/Modal";

interface FileUploadModuleProps {
    isOpen: boolean;
    updateModalState: () => void;
}

const FileUploadModule = ({
    isOpen,
    updateModalState,
}: FileUploadModuleProps): JSX.Element => {
    return (
        <Modal
            isOpen={isOpen}
            updateModalState={updateModalState}
            title="Upload File"
        >
            <>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Select the file you want to upload.
                    </p>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-gray-100 bg-blue-100 dark:bg-gray-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-dark-gray-800 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={updateModalState}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-gray-100 bg-blue-100 dark:bg-gray-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-dark-gray-800 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => toast("coming soon!", { icon: "💻" })}
                    >
                        Upload
                    </button>
                </div>
            </>
        </Modal>
    );
};

export default FileUploadModule;
