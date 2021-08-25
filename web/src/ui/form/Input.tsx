interface InputProps {
    input?: string;
    required?: boolean;
}

const Input = ({ input, required, ...rest }: InputProps): JSX.Element => {
    return (
        <input
            className="w-full h-10 px-3 text-base border-2 rounded-lg bg-gray-800 border-gray-900 text-gray-200 focus:outline-none focus:border-dark-gray-700 focus:ring-opacity-50"
            type={input}
            required={required}
            {...rest}
        />
    );
};

export default Input;
