interface InputProps {
    input?: string;
    required?: boolean;
}

const Input = ({ input, required, ...rest }: InputProps): JSX.Element => {
    return (
        <input
            className="w-full py-2 px-3 text-base border-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-900 text-gray-600 dark:text-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-dark-gray-700 focus:ring-opacity-50"
            type={input}
            required={required}
            {...rest}
        />
    );
};

export default Input;
