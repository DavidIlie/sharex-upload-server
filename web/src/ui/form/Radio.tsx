interface RadioProps {
    label: string;
}

const Radio = ({ label, ...rest }: RadioProps): JSX.Element => {
    return (
        <div className="flex items-center justify-between">
            <div className="block">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="bg-gray-100 border-gray-200 rounded shadow-sm dark:border-dark-gray-500 text-dark-gray-500 focus:border-dark-gray-600 focus:ring-1 focus:ring-dark-gray-800 focus:ring-opacity-50 dark:bg-dark-gray-800"
                        {...rest}
                    />
                    <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-dark-gray-300">
                        {label}
                    </span>
                </label>
            </div>
        </div>
    );
};

export default Radio;
