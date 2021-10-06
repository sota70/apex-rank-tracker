import * as Discord from 'discord.js'
import * as sqlDataEditor from './sqldataeditor'
import { Client } from 'pg'
import { User } from './userdata'

export class JsonFileManager {

    public async getPlayerData(discordUserId: String): Promise<User> {
        let playerData = new User("NULL", "NULL", "NULL")
        let playerDatas = await this.getPlayerDatas()
        for (let i = 0; i < playerDatas.length; i++) {
            if (playerDatas[i].discordUserId !== discordUserId) continue
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
            users.push(new User(discordUserId, username, platform))
        })
        return users
    }

    public removeAllData() {
        let client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        })
        client.connect()
        client.query("DROP TABLE username;", (err, res) => {
            if (err) throw err
            client.end()
        })
    }

    public async isDataExists(discordUserId: String): Promise<Boolean> {
        let playerData = await this.getPlayerDatas()
        return playerData.some(data => data.discordUserId === discordUserId)
    }

    public async writeData(
        discordUser: Discord.User,
        username: string,
        platform: string
    ) {
        let rows = new Map<string, any>([
            ["discordUserId", discordUser.id],
            ["username", username],
            ["platform", platform]
        ])
        if (!await this.isDataExists(discordUser.id)) {
            sqlDataEditor.insert("username", rows)
            return
        }
        sqlDataEditor.update("username", rows)
    }

    private delay(sec: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, sec * 1350)
        })
    }
}