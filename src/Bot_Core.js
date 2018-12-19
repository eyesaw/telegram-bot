"use strict";
exports.__esModule = true;
// import telegram bot
var TelegramBot = require("node-telegram-bot-api");
var Bot_Core = /** @class */ (function () {
    function Bot_Core(key, config) {
        this.key = key;
        this.config = config;
        if (!this.key || !this.config) {
            throw new Error('[-] missing parameter: key[string] , config:[object]');
        }
        this.bot = new TelegramBot(this.key, { polling: true });
        var _ = this;
        this.bot.onText(/\/(.+)/, function (user, match) {
            _.parse(user, match);
        });
    }
    /**
     * @param user
     * @param match (0 - full input / 1 - matching phrase )
     */
    Bot_Core.prototype.parse = function (user, match) {
        var _ = this;
        for (var i = 0; i < Object.keys(this.config).length; i++) {
            if (match[1].search(_.config[i].token) !== -1) {
                this.config[i].callback(user, this.bot);
                return;
            }
        }
    };
    return Bot_Core;
}());
exports["default"] = Bot_Core;
