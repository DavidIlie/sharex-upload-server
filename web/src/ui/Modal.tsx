import React from "react";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

import { useTheme } from "next-themes";

const customStyles = (theme: string) => {
    return {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            borderRadius: 8,
            padding: "20px 20px 20px 20px",
            transform: "translate(-50%, -50%)",
            backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6",
            border: "none",
            maxHeight: "80vh",
            width: "50%",
            maxWidth: 500,
        },
    };
};

export const Modal: React.FC<
    ReactModal["props"] & { variant?: keyof typeof customStyles }
> = ({ children, variant = "default", ...props }) => {
    const { theme } = useTheme();

    const onKeyDown = (event: React.KeyboardEvent) => {
        const currentActive = document.activeElement;

        if (event.key === "ArrowLeft") {
            (currentActive?.previousElementSibling as HTMLElement)?.focus();
        } else if (event.key === "ArrowRight") {
            (currentActive?.nextElementSibling as HTMLElement)?.focus();
        }
    };

    return (
        <ReactModal
            shouldCloseOnEsc
            shouldFocusAfterRender
            style={customStyles(theme!)}
            {...props}
        >
            <div className={`flex flex-col w-full`}>
                <div className={`flex justify-end absolute right-3 top-3`}>
                    <button
                        className="p-1 text-black dark:text-white"
                        onClick={(e) => props?.onRequestClose?.(e)}
                    >
                        <AiOutlineClose size="1.5rem" />
                    </button>
                </div>
                <div
                    tabIndex={-1}
                    className={`focus:outline-none`}
                    onKeyDown={onKeyDown}
                >
                    {children}
                </div>
            </div>
        </ReactModal>
    );
};
