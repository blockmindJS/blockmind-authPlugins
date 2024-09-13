const { BasePlugin } = require('blockmind');

class CustomAuthPlugin extends BasePlugin {
    constructor(bot, options) {
        super(bot, options);
        this.MC_SERVER = this.options.MC_SERVER;
        this.messageListener = this.handleMessage.bind(this);
        this.wasInHub = false;
    }

    start() {
        super.start();
        console.log('[AuthPlugin] Custom Auth Plugin started');
        if (!this.MC_SERVER) {
            console.log('[AuthPlugin] bot.MC_SERVER not specified. The bot will log in to /surv1');
            this.MC_SERVER = '1';
        }


        this.bot.on('message', this.messageListener);
        this.bot.on('spawn', async () => {
            const worldType = await this.handleWorldType();
            if (worldType === 'Hub') {
                this.wasInHub = true;
                await this.bot.sendMessage('local', `/surv${this.bot.MC_SERVER}`);
            } else if (worldType === 'Survival') {
                console.log('Player is in Survival world');
            }
        });
    }

    async handleAuthMessage(message) {
        const loginMatch = message.match(/^\n*(?:\||›|◊) Авторизируйтесь (?:»|›) \/login \[пароль\]/);
        const regMatch = message.match(/^\n*(?:\||›|◊) Зарегистрируйтесь (?:»|›) \/reg \[пароль\]/);

        if (loginMatch) {
            await this.bot.sendMessage('local', '/login ' + this.bot.password);
        } else if (regMatch) {
            await this.bot.sendMessage('local', '/reg ' + this.bot.password);
        }
    }

    async handleMessage(jsonMsg) {
        const message = jsonMsg.toString();
        if (!this.wasInHub) {
            await this.handleAuthMessage(message);
        }
    }

    async handleWorldType() {
        if (this.bot.game.difficulty === 'peaceful' && this.bot.game.levelType === 'flat') {
            if (this.bot.game.gameMode === 'adventure') {
                return 'Hub';
            } else {
                return 'Auth';
            }
        } else if (this.bot.game.difficulty === 'easy' && this.bot.game.levelType === 'default') {
            return 'Survival';
        }
    }
}

module.exports = CustomAuthPlugin;
