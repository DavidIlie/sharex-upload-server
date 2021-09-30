interface SettingSectionProps {
    title: string;
    subtitle: string;
    children: any;
}

const SettingSection = ({
    title,
    subtitle,
    children,
}: SettingSectionProps): JSX.Element => {
    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-6">
                <div className="md:col-span-2">
                    <div className="px-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-gray-100">
                            {title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-600 dark:text-dark-gray-400">
                            {subtitle}
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
            </div>
        </div>
    );
};

export default SettingSection;
