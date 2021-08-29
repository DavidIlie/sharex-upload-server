interface InputProps {
    required?: boolean;
    children: any;
}

const Select = ({ required, children, ...rest }: InputProps): JSX.Element => {
    return (
        <div className="relative inline-block w-full">
            <select
                {...rest}
                className="w-full h-10 pl-3 pr-6 text-base bg-gray-800 border-gray-900 border-2 text-gray-200 focus:outline-none focus:border-dark-gray-700 focus:ring-opacity-50 rounded-lg appearance-none"
            >
                {children}
            </select>
        </div>
    );
};

export default Select;
