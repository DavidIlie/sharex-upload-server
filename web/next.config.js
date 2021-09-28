const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@sharex-server/common"]);

const nextConfig = {
    async rewrites() {
        return [{ source: "/utils/:path*", destination: "/api/:path*" }];
    },
    transpileModules: ["react-syntax-highligher"],
};

module.exports = withPlugins([withTM], nextConfig);
