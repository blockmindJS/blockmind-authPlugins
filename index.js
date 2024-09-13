const CustomAuthPlugin = require('./src/CustomAuthPlugin');

module.exports = (bot, options) => {
    const plugin = new CustomAuthPlugin(bot, options);

    bot.customPlugins[options.name] = plugin;
    //

    plugin.start();
};
