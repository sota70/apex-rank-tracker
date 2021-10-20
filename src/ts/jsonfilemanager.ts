import * as Discord from 'discord.js'
import * as sqlDataEditor from './sqldataeditor'
import { User } from './userdata'

export class JsonFileManager {

    public async getPlayerData(discordUserId: string, guildId: string): Promise<User> {
        let playerData = new User("NULL", "NULL", "NULL", "NULL")
        let playerDatas = await this.getPlayerDatas()
        for (let i = 0; i < playerDatas.length; i++) {
            if (playerDatas[i].discordUserId !== discordUserId) continue
            if (playerDatas[i].guildId !== guildId) continue
            playerData = playerDatas[i]
        }
        return playerData
    }

    public async getPlayerDatas(): Promise<Array<User>> {
        let users: Array<User> = []
        let rows = await sqlDataEditor.select("username")
        rows.forEach(function (row) {
            let discordUserId = JSON.parse(JSON.stringify(row.discorduserid))
            let username = JSON.parse(JSON.stringify(row.username))
            let platform = JSON.parse(JSON.stringify(row.platform))
            let guildId = JSON.parse(JSON.stringify(row.guildid))
            users.push(new User(discordUserId, username, platform, guildId))
        })
        return users
    }

    public removeAllData() {
        sqlDataEditor.deleteRows("username")
    }

    public async isDataExists(discordUserId: string, guildId: string): Promise<Boolean> {
        let playerData = await this.getPlayerDatas()
        return playerData.some(data => data.discordUserId === discordUserId && data.guildId === guildId)
    }

    public async writeData(
        discordUser: Discord.User,
        username: string,
        platform: string,
        guildId: string
    ) {
        let rows = new Map<string, any>([
            ["discordUserId", discordUser.id],
            ["username", username],
            ["platform", platform],
            ["guildId", guildId]
        ])
        let keys = new Map<string, any>([
            ["discordUserId", discordUser.id],
            ["guildId", guildId]
        ])
        if (!await this.isDataExists(discordUser.id, guildId)) {
            sqlDataEditor.insert("username", rows)
            return
        }
        sqlDataEditor.update("username", rows, keys)
    }

    private delay(sec: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, sec * 1350)
        })
    }
}