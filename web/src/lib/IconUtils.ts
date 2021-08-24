const fileExtensoins = {
    html: ["htm"],
    markdown: ["md", "mdx"],
    sass: ["scss"],
    yaml: ["yml"],
    docker: ["dockerfile"],
    javascript: ["js"],
    typescript: ["ts", "d.ts"],
    react: ["jsx"],
    react_ts: ["tsx"],
    python: ["py"],
    java: ["class", "java", "jar"],
    git: ["git-commit", "git-rebase", "ignore"],
    zip: ["zip", "ear", "war", "rar", "7z"],
    image: ["png", "jpg", "jpeg"],
    video: [
        "mp4",
        "webm",
        "mkv",
        "flv",
        "vob",
        "ogv",
        "ogg",
        "avi",
        "mov",
        "wmv",
    ],
    audio: [
        "3gp",
        "aa",
        "aac",
        "aax",
        "act",
        "aif",
        "ala",
        "amr",
        "ape",
        "au",
        "awb",
        "dss",
        "dvf",
        "fla",
        "gsm",
        "ikl",
        "ivs",
        "m4a",
        "m4b",
        "m4p",
        "mmf",
        "mp3",
        "mpc",
        "msv",
        "nmf",
        "opu",
        "ra",
        "raw",
        "rf6",
        "sln",
        "tta",
        "voc",
        "vox",
        "wav",
        "wma",
        "wv",
        "web",
        "8sv",
        "cda",
    ],
    settings: ["properties", "editorconfig", "env", "env.ci", "env.example"],
};

export const getFileIconFromExtension = (fileName: string) => {
    const format = fileName.substring(fileName.indexOf(".") + 1);

    for (var extension in fileExtensoins) {
        //@ts-ignore
        if (fileExtensoins[extension].includes(format)) return extension;
    }

    return "zip";
};
