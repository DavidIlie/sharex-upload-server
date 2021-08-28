interface TopPartProps {
    children: any;
}

const TopPart = ({ children }: TopPartProps): JSX.Element => {
    return (
        <div className="px-4 py-5 bg-gray-700 bg-opacity-25 text-dark-gray-200 sm:p-6 shadow rounded-tl-md rounded-tr-md">
            <div className="grid grid-cols-6 gap-6">{children}</div>
        </div>
    );
};

export default TopPart;
