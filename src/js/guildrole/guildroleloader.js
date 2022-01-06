"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildRoleLoader = void 0;
var GuildRoleLoader = /** @class */ (function () {
    function GuildRoleLoader(guild) {
        this.guild = guild;
    }
    GuildRoleLoader.prototype.fetchRoleFromName = function (name) {
        return this.guild.roles.cache.find(function (role) { return role.name === name; });
    };
    return GuildRoleLoader;
}());
exports.GuildRoleLoader = GuildRoleLoader;
