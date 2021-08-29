interface InputProps {
    required?: boolean;
    children: any;
}

const Select = ({ required, children, ...rest }: InputProps): JSX.Element => {
    return (
        <div className="relative inline-block w-full">
            <select
                {...rest}
                className="w-full h-10 pl-3 pr-6 text-base bg-gray-800 border-dark-gray-800 text-gray-200 focus:outline-none focus:border-dark-gray-700 focus:ring-opacity-50 border rounded-lg appearance-none"
            >
                {children}
            </select>
        </div>
    );
};

export default Select;
