interface APIKeyCardProps {
    data: any;
}

const APIKeyCard = ({ data }: APIKeyCardProps): JSX.Element => {
    return (
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl flex justify-between w-full">
            <h1>{data.name}</h1>
            <div className="flex items-center gap-4">
                <h1 className="cursor-pointer">Permissions</h1>
                <h1 className="text-red-500 font-semibold cursor-pointer">
                    Delete
                </h1>
            </div>
        </div>
    );
};

export default APIKeyCard;
