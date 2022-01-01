interface InputProps {
    input?: string;
    required?: boolean;
}

const Input = ({ input, required, ...rest }: InputProps): JSX.Element => {
    return (
        <input
            className="w-full px-3 py-2 text-base text-gray-600 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-dark-gray-700 focus:ring-opacity-50"
            type={input}
            required={required}
            {...rest}
        />
    );
};

export default Input;
