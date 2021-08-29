const SaveButton = ({ ...rest }): JSX.Element => {
    return (
        <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-dark-gray-600 dark:bg-dark-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-dark-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
            {...rest}
        >
            Save
        </button>
    );
};

export default SaveButton;
