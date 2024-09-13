const CustomAuthPlugin = require('./src/CustomAuthPlugin');

// Функция для загрузки плагина
module.exports = (bot, options) => {
    const plugin = new CustomAuthPlugin(bot, options);
    plugin.start();
};
