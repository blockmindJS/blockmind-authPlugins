const { Command } = require('blockmind');
class Da extends Command {
    constructor() {
        super({
            name: 'da',
            argsCount: 0,
            permissions: 'user.say',
            allowedChatTypes: ['local', 'private'],
        });
    }

    async handler(bot, typeChat, user) {
        console.log(user);
        await bot.sendMessage(typeChat, `Команда da выполнена, ${user.username}!`, user.username);
    }
}

module.exports = Da;
