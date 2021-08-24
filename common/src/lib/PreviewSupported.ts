const supportedTypes = ["zip", "jar"];

export const SupportPreview = (icon: string) => {
    if (supportedTypes.includes(icon)) return true;
    return false;
};
