"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(discordUserId, username, platform) {
        this.discordUserId = discordUserId;
        this.username = username;
        this.platform = platform;
    }
    return User;
}());
exports.User = User;
