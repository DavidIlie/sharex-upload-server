interface APIKeyCardProps {
    data: any;
}

const APIKeyCard = ({ data }: APIKeyCardProps): JSX.Element => {
    return (
        <div className="bg-gray-800 p-4 rounded-xl flex justify-between">
            <h1>{data.name}</h1>
            <div className="flex items-center gap-4">
                <h1>View</h1>
                <h1>Delete</h1>
            </div>
        </div>
    );
};

export default APIKeyCard;
