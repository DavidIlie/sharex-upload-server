import Tippy from "@tippyjs/react";

interface Props {
    content: string;
    children: React.ReactElement;
}

export default function Tooltip({ content, children, ...rest }: Props) {
    return (
        <Tippy
            content={content}
            {...rest}
            hideOnClick={true}
            animation="shift-away"
        >
            {children}
        </Tippy>
    );
}
