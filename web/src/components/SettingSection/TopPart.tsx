interface TopPartProps {
    children: any;
    noGrid?: boolean;
    noBottom?: boolean;
}

const TopPart = ({ children, noGrid, noBottom }: TopPartProps): JSX.Element => {
    return (
        <div
            className={`bg-white px-4 py-5 dark:bg-gray-800 dark:bg-opacity-70 sm:p-6 shadow ${
                noBottom === undefined
                    ? "rounded-tl-md rounded-tr-md"
                    : "rounded-md"
            }`}
        >
            <div
                className={
                    noGrid === undefined ? "grid grid-cols-6 gap-6" : "-mt-4"
                }
            >
                {children}
            </div>
        </div>
    );
};

export default TopPart;
