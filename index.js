const CustomAuthPlugin = require('./src/CustomAuthPlugin');

// Функция для загрузки плагина
module.exports = (bot, options) => {
    const plugin = new CustomAuthPlugin(bot, options);

    if (!bot.customPlugins) {
        bot.customPlugins = {};
    }
    bot.customPlugins[bot.options.name] = plugin;

    plugin.start();
};
