interface LabelProps {
    children: React.ReactElement | string;
}

const Label = ({ children }: LabelProps): JSX.Element => {
    return (
        <label className="block font-medium text-sm text-dark-gray-300 mb-1">
            {children}
        </label>
    );
};

export default Label;
