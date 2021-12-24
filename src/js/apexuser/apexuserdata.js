"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserData = void 0;
/**
 * apexプレイヤーのデータを格納する用のデータクラス
 * 基本的にはapiを叩いて取得したプレイヤーデータをこのクラスに入れる時に使われる
 *
 * @property {@link playerName} プレイヤーの名前
 * @property {@link playerLevel} プレイヤーのレベル
 * @property {@link playerRank} プレイヤーのランク
 * @property {@link playerRankImage} プレイヤーのランクに適応したアイコン
 * @property {@link playerRankRP} プレイヤーのランクのポイント
 * @property {@link playerRanking} プレイヤーのランクの順位
 */
var ApexUserData = /** @class */ (function () {
    function ApexUserData(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking) {
        this.playerName = "None";
        this.playerLevel = 0;
        this.playerRank = "None";
        this.playerRankImage = "None";
        this.playerRankRP = -1;
        this.playerRanking = -1;
        this.playerName = playerName;
        this.playerLevel = playerLevel;
        this.playerRank = playerRank;
        this.playerRankImage = playerRankImage;
        this.playerRankRP = playerRankRP;
        this.playerRanking = playerRanking;
    }
    return ApexUserData;
}());
exports.ApexUserData = ApexUserData;
