"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserArenaData = void 0;
/**
 * apexプレイヤーのアリーナーデータを保管しておくデータクラス
 * * {@link ApexUserData}の一部として使われる
 *
 * @property {@link rank} アリーナのランク
 * @property {@link rankIconURL} アリーナのランクのアイコン画像URL
 * @property {@link rankRP} アリーナのランクスコア
 * @property {@link ranking} アリーナのランク順位
 */
var ApexUserArenaData = /** @class */ (function () {
    function ApexUserArenaData(rank, rankIconURL, rankRP, ranking) {
        this.rank = "";
        this.rankIconURL = "";
        this.rankRP = -1;
        this.rank = rank;
        this.rankIconURL = rankIconURL;
        this.rankRP = rankRP;
        this.ranking = ranking;
    }
    return ApexUserArenaData;
}());
exports.ApexUserArenaData = ApexUserArenaData;
