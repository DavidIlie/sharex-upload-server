interface TopPartProps {
    children: any;
}

const BottomPart = ({ children }: TopPartProps): JSX.Element => {
    return (
        <div className="flex items-center justify-end px-4 py-2 bg-gray-800 text-right sm:px-6 shadow rounded-bl-md rounded-br-md">
            {children}
        </div>
    );
};

export default BottomPart;
