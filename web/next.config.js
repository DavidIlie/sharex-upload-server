const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@sharex-server/common"]);

module.exports = withPlugins([withTM]);
