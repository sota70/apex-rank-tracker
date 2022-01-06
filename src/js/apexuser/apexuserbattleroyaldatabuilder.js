"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserBattleRoyalDataBuilder = void 0;
var apexuserbattleroyaldata_1 = require("./apexuserbattleroyaldata");
var ApexUserBattleRoyalDataBuilder = /** @class */ (function () {
    function ApexUserBattleRoyalDataBuilder(playerStats) {
        this.playerStats = playerStats;
    }
    ApexUserBattleRoyalDataBuilder.prototype.build = function () {
        var rank = this.playerStats.rankScore.metadata.rankName;
        var rankIconURL = this.playerStats.rankScore.metadata.iconUrl;
        var rankRP = this.playerStats.rankScore.value;
        var ranking = this.playerStats.rankScore.rank;
        return new apexuserbattleroyaldata_1.ApexUserBattleRoyalData(rank, rankIconURL, rankRP, ranking);
    };
    return ApexUserBattleRoyalDataBuilder;
}());
exports.ApexUserBattleRoyalDataBuilder = ApexUserBattleRoyalDataBuilder;
