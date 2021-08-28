export type MediaSettingsType = {
    images: {
        per_page: number;
    };
    files: {
        per_page: number;
    };
    texts: {
        per_page: number;
    };
};

export type SettingsType = {
    name: string;
    default_theme: "dark" | "light";
    domains?: string;
    media_settings?: MediaSettingsType;
};
