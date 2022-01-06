"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildRankRoleLoader = void 0;
var guildroleloader_1 = require("./guildroleloader");
var rankroles_1 = require("./rankroles");
var GuildRankRoleLoader = /** @class */ (function (_super) {
    __extends(GuildRankRoleLoader, _super);
    function GuildRankRoleLoader(guild) {
        return _super.call(this, guild) || this;
    }
    GuildRankRoleLoader.prototype.fetchApexBattleRoyalRankRoles = function () {
        var _this = this;
        var roles = [];
        rankroles_1.BATTLE_ROYAL_RANK_ROLE_NAMES.forEach(function (value) {
            var role = _this.guild.roles.cache.find(function (r) { return r.name === value; });
            roles.push(role);
        });
        return roles;
    };
    GuildRankRoleLoader.prototype.fetchApexArenaRankRoles = function () {
        var _this = this;
        var roles = [];
        rankroles_1.ARENA_RANK_ROLE_NAMES.forEach(function (value) {
            var role = _this.guild.roles.cache.find(function (r) { return r.name === value; });
            roles.push(role);
        });
        return roles;
    };
    return GuildRankRoleLoader;
}(guildroleloader_1.GuildRoleLoader));
exports.GuildRankRoleLoader = GuildRankRoleLoader;
