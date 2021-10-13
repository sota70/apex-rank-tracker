"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(discordUserId, username, platform, guildId) {
        this.discordUserId = discordUserId;
        this.username = username;
        this.platform = platform;
        this.guildId = guildId;
    }
    return User;
}());
exports.User = User;
