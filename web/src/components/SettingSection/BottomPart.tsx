interface TopPartProps {
    children: any;
}

const BottomPart = ({ children }: TopPartProps): JSX.Element => {
    return (
        <div className="flex items-center justify-end px-4 py-2 text-right bg-gray-200 shadow dark:bg-gray-800 sm:px-6 rounded-bl-md rounded-br-md">
            {children}
        </div>
    );
};

export default BottomPart;
