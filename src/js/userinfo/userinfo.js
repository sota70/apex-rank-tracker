"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
var UserInfo = /** @class */ (function () {
    function UserInfo(discordUserId, username, platform, guildId) {
        this.discordUserId = discordUserId;
        this.username = username;
        this.platform = platform;
        this.guildId = guildId;
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
