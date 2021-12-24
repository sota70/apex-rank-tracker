import { SqlDataManager } from '../sql/sqldatamanager'
import { UserInfo } from './userinfo'

/**
 * ディスコードのユーザー情報をデータべースから読み込むクラス
 * 
 * @property {@link discordUserId} ディスコードのユーザーのID
 * @property {@link guildId} ディスコードサーバーのID
 */
export class UserInfoReader {

    private discordUserId: string
    private guildId: string

    /**
     * ディスコードのユーザー情報を読み込むために必要な情報をセットする
     * 
     * @param discordUserId ディスコードのユーザーのID
     * @param guildId ディスコードサーバーのID
     */
    constructor(discordUserId: string, guildId: string) {
        this.discordUserId = discordUserId
        this.guildId = guildId
    }

    /**
     * データベースに保存されている全てのディスコードユーザーの情報を読み込むメソッド
     * {@link UserInfo}クラスにユーザーの情報を入れたものを一つずつ配列に入れていき、最後にそれを返す
     * 
     * @returns ユーザー情報が入った{@link UserInfo}クラスの配列を返す
     */
    public static async getPlayerDatas(): Promise<Array<UserInfo>> {
        let users: Array<UserInfo> = []
        let datas = await new SqlDataManager("username").select()
        datas.forEach(function (data) {
            users.push(new UserInfo(data.discorduserid, data.username, data.platform, data.guildid))
        })
        return users
    }

    /**
     * 指定したユーザー情報を読み込むメソッド
     * データベースに、同じ{@link discordUserId}と{@link guildId}を持つデータがあれば、それを返す
     * 同じデータが存在しない場合は、全てのプロパティにNULLを入れた{@link UserInfo}クラスを返す
     * 
     * @returns 指定したユーザー情報が入った{@link UserInfo}クラスを返す
     */
    public async getPlayerData(): Promise<UserInfo> {
        let playerData = new UserInfo('NULL', 'NULL', 'NULL', 'NULL')
        let playerDatas = await UserInfoReader.getPlayerDatas()
        for (let i = 0; i < playerDatas.length; i++) {
            if (playerDatas[i].discordUserId !== this.discordUserId) continue
            if (playerDatas[i].guildId !== this.guildId) continue
            playerData = playerDatas[i]
        }
        return playerData
    }

    /**
     * 指定したユーザー情報がデータベース上にあるかどうか確認するメソッド
     * 
     * @returns 同じ{@link discordUserId}と{@link guildId}があればtrueを返し、そうでない場合はfalseを返す
     */
    public async isDataExists(): Promise<Boolean> {
        let playerDatas = await UserInfoReader.getPlayerDatas()
        return playerDatas.some(data => data.discordUserId === this.discordUserId && data.guildId === this.guildId)
    }
}