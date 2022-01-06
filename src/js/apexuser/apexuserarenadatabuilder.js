"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserArenaDataBuilder = void 0;
var apexuserarenadata_1 = require("./apexuserarenadata");
var ApexUserArenaDataBuilder = /** @class */ (function () {
    function ApexUserArenaDataBuilder(playerStats) {
        this.playerStats = playerStats;
    }
    ApexUserArenaDataBuilder.prototype.build = function () {
        var rank = this.playerStats.arenaRankScore.metadata.rankName;
        var rankIconURL = this.playerStats.arenaRankScore.metadata.iconUrl;
        var rankRP = this.playerStats.arenaRankScore.value;
        var ranking = this.playerStats.arenaRankScore.rank;
        return new apexuserarenadata_1.ApexUserArenaData(rank, rankIconURL, rankRP, ranking);
    };
    return ApexUserArenaDataBuilder;
}());
exports.ApexUserArenaDataBuilder = ApexUserArenaDataBuilder;
