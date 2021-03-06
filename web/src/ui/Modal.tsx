import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    updateModalState: () => void;
    title: string;
    children: JSX.Element;
}

const Modal = ({
    isOpen,
    updateModalState,
    title,
    children,
    ...rest
}: ModalProps): JSX.Element => {
    let refDiv = useRef(null);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={updateModalState}
                initialFocus={refDiv}
                {...rest}
            >
                <div className="min-h-screen px-4 text-center" ref={refDiv}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    </Transition.Child>

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2 border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100"
                            >
                                {title}
                            </Dialog.Title>
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
