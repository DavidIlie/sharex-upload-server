import React from "react";

interface TooltipProps {
    children: React.ReactElement;
    text: string;
}

const Tooltip = ({ children, text }: TooltipProps): JSX.Element => {
    const tipRef = React.createRef<HTMLDivElement>();

    function handleMouseEnter() {
        if (tipRef.current) {
            tipRef.current.style.opacity = "1";
            tipRef.current.style.marginLeft = "20px";
        }
    }
    function handleMouseLeave() {
        if (tipRef.current) {
            tipRef.current.style.opacity = "0";
            tipRef.current.style.marginLeft = "10px";
        }
    }

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute whitespace-no-wrap bg-black text-white px-4 py-2 rounded-xl flex items-center transition-all duration-150"
                style={{ bottom: "120%", opacity: 0 }}
                ref={tipRef}
            >
                <div
                    className="bg-black h-3 w-3 absolute"
                    style={{ bottom: "-6px", transform: "rotate(45deg)" }}
                />
                {text}
            </div>
            {children}
        </div>
    );
};

export default Tooltip;
