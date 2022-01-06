"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserData = void 0;
var apexuserarenadata_1 = require("./apexuserarenadata");
var apexuserbattleroyaldata_1 = require("./apexuserbattleroyaldata");
/**
 * apexプレイヤーのデータを格納する用のデータクラス
 * 基本的にはapiを叩いて取得したプレイヤーデータをこのクラスに入れる時に使われる
 *
 * @property {@link playerName} プレイヤーの名前
 * @property {@link playerLevel} プレイヤーのレベル
 * @property {@link ApexUserBattleRoyalData} プレイヤーのバトルロワイヤルのデータ
 * @property {@link ApexUserArenaData} プレイヤーのアリーナのデータ
 */
var ApexUserData = /** @class */ (function () {
    function ApexUserData(playerName, playerLevel, battleRoyalData, arenaData) {
        this.playerName = "";
        this.playerLevel = -1;
        this.battleRoyalData = new apexuserbattleroyaldata_1.ApexUserBattleRoyalData("", "", -1, -1);
        this.arenaData = new apexuserarenadata_1.ApexUserArenaData("", "", -1, -1);
        this.playerName = playerName;
        this.playerLevel = playerLevel;
        this.battleRoyalData = battleRoyalData;
        this.arenaData = arenaData;
    }
    return ApexUserData;
}());
exports.ApexUserData = ApexUserData;
