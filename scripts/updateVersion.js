const fs = require("fs");

const main = async () => {
    const file = fs.readFileSync(__dirname + "/../common/src/version.ts");
    let currentVersion = file.toString();
    currentVersion = currentVersion.split("= ");
    currentVersion = currentVersion[1].split(";\n");
    currentVersion = parseFloat(currentVersion[0]);

    let newVersion = currentVersion * 100;
    newVersion = newVersion + 1;
    newVersion = newVersion / 100;

    const newVersionTs = `export const appVersion = ${newVersion};\n`;

    fs.writeFileSync(__dirname + "/../common/src/version.ts", newVersionTs);
};

main();
