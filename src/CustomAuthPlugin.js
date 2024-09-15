class CustomAuthPlugin {
    constructor(bot, options = {}) {
        this.bot = bot;
        this.options = options;
        this.botPassword = bot.password || options.password;
        this.wasInHub = false;
        this.MC_SERVER = bot.MC_SERVER || options.MC_SERVER;
    }

    start() {
        console.log('[AuthPlugin] Custom Auth Plugin started');

        if (!this.MC_SERVER) {
            console.log('[AuthPlugin] bot.MC_SERVER not specified. The bot will log in to /surv1');
            this.MC_SERVER = 1;
        }

        this.checkBotEntity(async () => {
            this.bot.isAlive = true;

            const worldType = await this.handleWorldType();

            if (worldType === 'Hub') {
                this.wasInHub = true;
                await this.bot.sendMessage('local', `/surv${this.MC_SERVER}`);
            } else if (worldType === 'Survival') {
                console.log('Player is in Survival world');
            }

            this.bindEvents();
        });
    }

    checkBotEntity(callback) {
        if (this.bot.entity) {
            console.log('[AuthPlugin] Bot entity initialized.');
            callback();
        } else {
            console.log('[AuthPlugin] Bot entity is not initialized yet, retrying in 1 second...');
            setTimeout(() => this.checkBotEntity(callback), 1000);
        }
    }

    bindEvents() {

        this.bot.on('message', this.handleMessage.bind(this));
    }

    async handleMessage(jsonMsg) {
        const message = jsonMsg.toString();
        if (!this.wasInHub) {
            await this.handleAuthMessage(message);
        }
    }

    async handleAuthMessage(message) {
        const loginMatch = message.includes('/login');
        const regMatch = message.includes('/reg');

        if (loginMatch) {
            await this.bot.sendMessage('local', '/login ' + this.botPassword);
            await this.bot.sendMessage('local', `/surv${this.MC_SERVER}`);
        } else if (regMatch) {
            await this.bot.sendMessage('local', '/reg ' + this.botPassword);
            await this.bot.sendMessage('local', `/surv${this.MC_SERVER}`);
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
