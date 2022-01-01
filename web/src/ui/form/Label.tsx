interface LabelProps {
    children: React.ReactElement | string;
}

const Label = ({ children }: LabelProps): JSX.Element => {
    return (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-dark-gray-300">
            {children}
        </label>
    );
};

export default Label;
