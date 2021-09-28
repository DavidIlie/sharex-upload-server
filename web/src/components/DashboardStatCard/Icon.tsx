interface IconTypes {
    type: "file" | "image" | "text" | "metric";
}

const Icon = ({ type }: IconTypes): JSX.Element => {
    return type === "file" ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="sm:h-16 sm:w-16 h-12 w-12 text-gray-700 dark:text-dark-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
    ) : type === "image" ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="sm:h-16 sm:w-16 h-12 w-12 text-gray-700 dark:text-dark-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
            />
        </svg>
    ) : type === "text" ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="sm:h-16 sm:w-16 h-12 w-12 text-gray-700 dark:text-dark-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
            />
        </svg>
    ) : (
        <span />
    );
};

export default Icon;
