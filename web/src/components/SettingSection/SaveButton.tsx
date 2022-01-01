const SaveButton = ({
    isSubmitting,
    ...rest
}: {
    isSubmitting?: boolean;
}): JSX.Element => {
    return (
        <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md bg-dark-gray-600 dark:bg-dark-gray-600 hover:bg-dark-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25"
            {...rest}
        >
            {isSubmitting ? "Saving" : "Save"}
        </button>
    );
};

export default SaveButton;
