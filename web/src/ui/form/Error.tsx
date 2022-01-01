const Error = ({
    error,
}: {
    error: string | string[] | undefined;
}): JSX.Element => {
    return error !== undefined ? (
        <p className="mt-2 text-sm text-red-400">{error}</p>
    ) : (
        <div className="hidden" />
    );
};

export default Error;
