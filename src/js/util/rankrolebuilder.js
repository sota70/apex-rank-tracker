"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankRoleBuilder = void 0;
var RankRoleBuilder = /** @class */ (function () {
    function RankRoleBuilder(rankName, guild) {
        this.rankName = rankName;
        this.guild = guild;
    }
    RankRoleBuilder.prototype.build = function () {
        var _this = this;
        var role = this.guild.roles.cache.find(function (role) { return role.name === _this.rankName; });
        if (role === undefined)
            throw Error("Guild must have a " + this.rankName + " role");
        return role;
    };
    RankRoleBuilder.prototype.buildPredatorRole = function () {
        var predatorRole = this.guild.roles.cache.find(function (role) { return role.name === "Predator"; });
        if (predatorRole === undefined)
            throw Error("Guild must have a predator role");
        return predatorRole;
    };
    return RankRoleBuilder;
}());
exports.RankRoleBuilder = RankRoleBuilder;
