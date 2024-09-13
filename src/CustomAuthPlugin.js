class CustomAuthPlugin {
    constructor(bot, options = {}) {
        this.bot = bot;
        this.options = options;
        this.botPassword = bot.password || options.password;
        this.wasInHub = false;
        //
    }

    start() {
        console.log('[AuthPlugin] Custom Auth Plugin started');

        if (!this.bot.MC_SERVER) {
            console.log('[AuthPlugin] bot.MC_SERVER not specified. The bot will log in to /surv1');
            this.bot.MC_SERVER = 1;
        }

        this.bot.on('message', this.handleMessage.bind(this));
        this.bot.on('spawn', this.onSpawn.bind(this));
    }

    async onSpawn() {
        const worldType = await this.handleWorldType();
        if (worldType === 'Hub') {
            this.wasInHub = true;
            await this.bot.sendMessage('local', `/surv${this.MC_SERVER}`);
        } else if (worldType === 'Survival') {
            console.log('Player is in Survival world');
        }
    }

    async handleMessage(jsonMsg) {
        const message = jsonMsg.toString();
        if (!this.wasInHub) {
            await this.handleAuthMessage(message);
        }
    }

    async handleAuthMessage(message) {
        const loginMatch = message.match(/^\n*(?:\||›|◊) Авторизируйтесь (?:»|›) \/login \[пароль\]/);
        const regMatch = message.match(/^\n*(?:\||›|◊) Зарегистрируйтесь (?:»|›) \/reg \[пароль\]/);

        if (loginMatch) {
            await this.bot.sendMessage('local', '/login ' + this.botPassword);
        } else if (regMatch) {
            await this.bot.sendMessage('local', '/reg ' + this.botPassword);
        }
    }

    async handleWorldType() {
        if (this.bot.game.difficulty === 'peaceful' && this.bot.game.levelType === 'flat') {
            return this.bot.game.gameMode === 'adventure' ? 'Hub' : 'Auth';
        } else if (this.bot.game.difficulty === 'easy' && this.bot.game.levelType === 'default') {
            return 'Survival';
        }
    }
}

module.exports = CustomAuthPlugin;
