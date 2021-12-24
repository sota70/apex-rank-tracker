"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankRoleBuilder = void 0;
/**
 * rankNameからランクロールを見つけて、返すクラス
 *
 * @property {@link rankName} ランク名
 * @property {@link guild} ディスコードサーバー
 */
var RankRoleBuilder = /** @class */ (function () {
    /**
     * {@link rankName}と{@link guild}をセットする
     *
     * @param rankName ランク名
     * @param guild ディスコードサーバー
     */
    function RankRoleBuilder(rankName, guild) {
        this.rankName = rankName;
        this.guild = guild;
    }
    /**
     * ディスコードサーバーにある{@link rankName}と対応するロールがあった場合、そのロールを返すメソッド
     * * サーバーにランク名と合うロールが無い場合はエラーになる
     *
     * @returns {@link rankName}と対応するロールを返す
     */
    RankRoleBuilder.prototype.build = function () {
        var _this = this;
        var role = this.guild.roles.cache.find(function (role) { return role.name === _this.rankName; });
        if (role === undefined)
            throw Error("Guild must have a " + this.rankName + " role");
        return role;
    };
    /**
     * ディスコードサーバーにあるプレデータロールを探して、返すメソッド
     * * ディスコードサーバーにプレデターロールが無い場合、エラーになる
     *
     * @returns プレデターロールを返す
     */
    RankRoleBuilder.prototype.buildPredatorRole = function () {
        var predatorRole = this.guild.roles.cache.find(function (role) { return role.name === "Predator"; });
        if (predatorRole === undefined)
            throw Error("Guild must have a predator role");
        return predatorRole;
    };
    return RankRoleBuilder;
}());
exports.RankRoleBuilder = RankRoleBuilder;
