"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserBattleRoyalData = void 0;
/**
 * apexプレイヤーのバトルロワイヤルのデータを保管しておくデータクラス
 * * {@link ApexUserData}の一部として使われる
 *
 * @property {@link rank} バトルロワイヤルのランク
 * @property {@link rankIconURL} バトルロワイヤルのランクアイコンの画像URL
 * @property {@link rankRP} バトルロワイヤルランクのランクスコア
 * @property {@link ranking} バトルロワイヤルのランク順位
 */
var ApexUserBattleRoyalData = /** @class */ (function () {
    function ApexUserBattleRoyalData(rank, rankIconURL, rankRP, ranking) {
        this.rank = "";
        this.rankIconURL = "";
        this.rankRP = -1;
        this.rank = rank;
        this.rankIconURL = rankIconURL;
        this.rankRP = rankRP;
        this.ranking = ranking;
    }
    return ApexUserBattleRoyalData;
}());
exports.ApexUserBattleRoyalData = ApexUserBattleRoyalData;
