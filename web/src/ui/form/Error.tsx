const Error = ({
    error,
}: {
    error: string | string[] | undefined;
}): JSX.Element => {
    return error !== undefined ? (
        <p className="text-sm text-red-400 mt-2">{error}</p>
    ) : (
        <div className="hidden" />
    );
};

export default Error;
