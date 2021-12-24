import { SqlDataManager } from '../sql/sqldatamanager'
import { UserInfoReader } from './userinforeader'

/**
 * ディスコードユーザーの情報をデータベースに書き込むクラス
 * * ここで書き込む情報はすべて5分毎に起こるランクセットシステムに使われる
 * 
 * @property {@link discordUserId} ディスコードのユーザーのID
 * @property {@link username} ApexLegendsのユーザー名
 * @property {@link platform} ApexLegendsをプレイしているプラットフォーム(e.g. PC, PS4, Xbox)
 * @property {@link guildId} ディスコードサーバーのID
 * @property {@link userInfoReader} ユーザーの情報をデータベースから読み込むクラス
 */
export class UserInfoWriter {

    private discordUserId: string
    private username: string
    private platform: string
    private guildId: string
    private userInfoReader: UserInfoReader

    /**
     * ディスコードユーザーの情報や、ApexLegendsのユーザー名などをセットする
     * 
     * @param discordUserId ディスコードのユーザーのID
     * @param username ApexLegendsのユーザー名
     * @param platform ApexLegendsのプレイしているプラットフォーム(e.g. PC, PS4, Xbox)
     * @param guildId ディスコードサーバーのID
     */
    constructor(
        discordUserId: string,
        username: string,
        platform: string,
        guildId: string
    ) {
        this.discordUserId = discordUserId
        this.username = username
        this.platform = platform
        this.guildId = guildId
        this.userInfoReader = new UserInfoReader(discordUserId, guildId)
    }

    /**
     * ディスコードユーザーの情報をデータベースに書き込むメソッド
     * * もし既にデータが保存されていた場合は、データを上書きする
     */
    public async writeData() {
        let data = new Map<string, any>([
            ["discordUserId", this.discordUserId],
            ["username", this.username],
            ["platform", this.platform],
            ["guildId", this.guildId]
        ])
        let conditions = new Map<string, any>([
            ["discordUserId", this.discordUserId],
            ["guildId", this.guildId]
        ])
        let sqlDataManager = new SqlDataManager("username")
        if (!await this.userInfoReader.isDataExists()) {
            sqlDataManager.insert(data)
            return
        }
        sqlDataManager.update(data, conditions)
    }
}