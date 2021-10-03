import * as Discord from 'discord.js'
import * as fs from 'fs'
import { User } from './userdata'

export class JsonFileManager {

    public getPlayerData(discordUserId: String): User {
        let playerData = new User("NULL", "NULL", "NULL")
        let playerDatas = this.getPlayerDatas()
        for (let i = 0; i < playerDatas.length; i++) {
            if (playerDatas[i].discordUserId !== discordUserId) continue
            playerData = playerDatas[i]
        }
        return playerData
    }

    public getPlayerDatas(): Array<User> {
        let file = fs.readFileSync("./username.json", "utf-8")
        return JSON.parse(file)
    }

    public removeAllData() {
        let playerData = this.getPlayerDatas()
        playerData.splice(0, playerData.length)
        fs.writeFileSync("./username.json", JSON.stringify(playerData))
    }

    public isDataExists(discordUserId: String): Boolean {
        let playerData = this.getPlayerDatas()
        let dataExists = false
        for (let i = 0; i < playerData.length; i++) {
            if (playerData[i].discordUserId !== discordUserId) continue
            dataExists = true
        }
        return dataExists
    }

    public writeData(
        discordUser: Discord.User,
        username: string,
        platform: string
    ) {
        let playerData = this.getPlayerDatas()
        let discordUserId = discordUser.id
        if (this.isDataExists(discordUserId)) {
            this.removeData(discordUserId, playerData)
        }
        playerData.push(new User(discordUserId, username, platform))
        fs.writeFileSync("./username.json", JSON.stringify(playerData))
    }

    private removeData(discordUserId: string, playerData: Array<User>) {
        for (let i = 0; i < playerData.length; i++) {
            if (playerData[i].discordUserId !== discordUserId) continue
            playerData.splice(i, 1)
        }
    }

    private sendSetApexUserNameMessage(channel: Discord.TextBasedChannels, username: string) {
        let successMessage = new Discord.MessageEmbed()
            .setTitle(`ユーザーネームを${username}にセットしました`)
        channel.send({ embeds: [successMessage] })
    }
}