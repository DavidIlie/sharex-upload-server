const supportedTypes = ["zip", "java"];

export const SupportPreview = (icon: string) => {
    if (supportedTypes.includes(icon)) return true;
    return false;
};
