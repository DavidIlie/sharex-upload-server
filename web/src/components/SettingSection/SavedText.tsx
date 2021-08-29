const SavedText = ({ ...rest }): JSX.Element => {
    return (
        <div
            {...rest}
            className="text-sm text-gray-600 dark:text-dark-gray-400 mr-3"
        >
            Saved.
        </div>
    );
};

export default SavedText;
