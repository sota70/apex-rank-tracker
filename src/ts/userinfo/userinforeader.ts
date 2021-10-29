import { SqlDataManager } from '../sql/sqldatamanager'
import { UserInfo } from './userinfo'

export class UserInfoReader {

    private discordUserId: string
    private guildId: string

    constructor(discordUserId: string, guildId: string) {
        this.discordUserId = discordUserId
        this.guildId = guildId
    }

    public static async getPlayerDatas(): Promise<Array<UserInfo>> {
        let users: Array<UserInfo> = []
        let datas = await new SqlDataManager("username").select()
        datas.forEach(function (data) {
            users.push(new UserInfo(data.discorduserid, data.username, data.platform, data.guildid))
        })
        return users
    }

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

    public async isDataExists(): Promise<Boolean> {
        let playerDatas = await UserInfoReader.getPlayerDatas()
        return playerDatas.some(data => data.discordUserId === this.discordUserId && data.guildId === this.guildId)
    }
}