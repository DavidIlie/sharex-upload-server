export const bytesToSize = (bytes: number, decimals = 2) => {
    if (bytes === 0)
        return {
            value: 0,
            unit: "Bytes",
        };

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return {
        value: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
        unit: sizes[i],
    };
};
