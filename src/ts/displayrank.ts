import { Client } from 'discord.js'
import { JsonFileManager } from './jsonfilemanager'
import { PlayerDataLoader } from './jsonplayerdatagetter'

const jsonFileManager = new JsonFileManager()

export function startTimer(client: Client) {
    let min = 60000
    let loopTime = min * 5
    setInterval(setDiscordUserRole,loopTime, client)
    console.log("タイマーがスタートしました")
}

async function setDiscordUserRole(client: Client) {
    (await jsonFileManager.getPlayerDatas()).forEach(async function (data) {
        let playerDataLoader = new PlayerDataLoader()
        let guild = await client.guilds.fetch(data.guildId)
        let discordUser = await guild.members.fetch(data.discordUserId)
        let username = data.username
        let platform = data.platform
        playerDataLoader.setPlayerRankRole(discordUser, username, platform, guild)
    })
}