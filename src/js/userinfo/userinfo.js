"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
/**
 * ユーザーの情報を保存しておくようのデータクラス
 *
 * * このデータは全て5分毎に起こるランクセットシステムに使われる
 *
 * @property {@link discordUserId} ディスコードのユーザーのID
 * @property {@link username} ApexLegendsのユーザー名
 * @property {@link platform} ApexLegendsをプレイする時のプラットフォーム(e.g. PC, PS4, Xbox)
 * @property {@link guildId} ディスコードサーバーのID
 */
var UserInfo = /** @class */ (function () {
    /**
     * ユーザーの情報をセットする
     *
     * @param discordUserId ディスコードのユーザーのID
     * @param username ApexLegendsのユーザー名
     * @param platform ApexLegendsをプレイする時のプラットフォーム(e.g. PC, PS4, Xbox)
     * @param guildId ディスコードサーバーのID
     */
    function UserInfo(discordUserId, username, platform, guildId) {
        this.discordUserId = discordUserId;
        this.username = username;
        this.platform = platform;
        this.guildId = guildId;
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
