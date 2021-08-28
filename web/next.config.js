const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@sharex-server/common"]);

const nextConfig = {
    images: {
        domains: ["localhost"],
    },
};

module.exports = withPlugins([withTM], nextConfig);
