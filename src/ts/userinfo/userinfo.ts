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
export class UserInfo {

    public discordUserId: string
    public username: string
    public platform: string
    public guildId: string

    /**
     * ユーザーの情報をセットする
     * 
     * @param discordUserId ディスコードのユーザーのID
     * @param username ApexLegendsのユーザー名
     * @param platform ApexLegendsをプレイする時のプラットフォーム(e.g. PC, PS4, Xbox)
     * @param guildId ディスコードサーバーのID
     */
    constructor(discordUserId: string, username: string, platform: string, guildId: string) {
        this.discordUserId = discordUserId
        this.username = username
        this.platform = platform
        this.guildId = guildId
    }
}