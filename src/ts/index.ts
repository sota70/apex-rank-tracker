import * as env from 'dotenv'
import * as Discord from 'discord.js'
import * as http from 'http'
import * as command from './commandtype'
import * as commandChannelSetter from './commandchannelsetter'
import * as pg from 'pg'
import * as sqlDataEditor from './sqldataeditor'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { PlayerDataLoader } from './jsonplayerdatagetter'
import { JsonFileManager } from './jsonfilemanager'
import { CommandHandler } from './commandhandler'
import { Intents, Client, ClientApplication } from 'discord.js'
import { CommandChannelLoader } from './commandchannelloader'

const jsonFileManager = new JsonFileManager()
const guildId = "814796519131185156"
const config = env.config()
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

/* TOKENと適するボットとしてログインする */
loginToClient()

client.on('ready',async () => {
    console.log(`${client.user?.tag}でログインしています`)
    console.log('準備完了')
    await registerCommands()
    client.application = new ClientApplication(client, {})
    await client.application.fetch()
})

/* ボットを動かしているサーバーに送られてきたメソッドメソッドを受け取り、処理するメソッド*/
http.createServer(function (req, res) {
    if (req.method == "POST") {
        var data = ''
        req.on("data", function (chunk) { data += chunk })
        req.on("end", async function () {
            if (!data) {
                res.end("No Post Data")
                return
            }
            var dataObject = new URLSearchParams(data)
            console.log(`post: ${dataObject.get('type')}`)
            if (dataObject.get('type') == 'wake') {
                console.log('Woke up in post')
                res.end()
                return
            }
            if (dataObject.get('type') == 'update_rank') {
                console.log(`Updated player's rank`)
                await setDiscordUsersRole(client)
                res.end()
                return
            }
            res.end()
        })
    } else if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end()
    }
}).listen(process.env.PORT || 5000)

async function setDiscordUsersRole(client: Client) {
    (await jsonFileManager.getPlayerDatas()).forEach(async function (data) {
        let playerDataLoader = new PlayerDataLoader()
        let guild = await client.guilds.fetch(data.guildId)
        let discordUser = await guild.members.fetch(data.discordUserId)
        let username = data.username
        let platform = data.platform
        playerDataLoader.setPlayerRankRole(discordUser, username, platform, guild)
    })
}

/*
 * コマンドを登録するメソッド
 */
async function registerCommands() {
    const commands = [
        command.apexCommand,
        command.apexAliaseCommand,
        command.setCommandChannelCommand,
        command.setCommandChannelAliaseCommand,
        command.setUsernameCommand,
        command.setUsernameAliaseCommand
    ].map(command => command.toJSON())
    console.log(commands)
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN!)
    const clientId = '821655399857127485'
    try {
        console.log('Started refreshing application (/) commands.')
        await rest.put(Routes.applicationCommands(clientId), { body: commands })
        console.log('Successfully reloaded application (/) commands.')
    } catch (err) {
        console.error(err)
    }
}

/* 
 * プレイヤーが打ったメッセージからコマンドを検知して、それぞれのコマンドに適応した処理をするメソッド
 */
client.on('interactionCreate', async function (interaction) {
    let serverId = interaction.guildId
    let channelId = interaction.channelId
    let commandChannelLoader = new CommandChannelLoader(serverId!)
    let commandChannelId = await commandChannelLoader.getCommandChannelId(client)
    if (!interaction.isCommand()) return
    if (channelId !== commandChannelId) {
        interaction.reply({ content: "This is not the command channel", ephemeral: true })
        return
    }
    new CommandHandler(interaction).handle()
})

function loginToClient() {
    if (process.env.TOKEN == undefined) {
        console.log("TOKENが設定されていません")
        process.exit(0)
    }
    client.login(process.env.TOKEN)
}

function createMessageEmbed(
    playerName: string,
    playerLevel: number,
    playerRank: string,
    playerRankRP: number,
    playerRanking: number,
    playerRankImageUrl: string 
) {
    let embed
    if (isPlayerRankPredator(playerRanking)) {
        embed = createPredatorPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking)
    } else {
        embed = createPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl)
    }
    return embed
}

function isPlayerRankPredator(playerRanking: number): Boolean {
    if (playerRanking === undefined) return false
    return playerRanking <= 750
}

function createPlayerDataEmbed(
    playerName: string,
    playerLevel: number,
    playerRank: string,
    playerRankRP: number,
    playerRankImageUrl: string
): Discord.MessageEmbed {
    let blank = '\u200b'
    return new Discord.MessageEmbed()
        .setTitle("PlayerStatus")
        .addField("PlayerName", playerName)
        .addField(blank, blank)
        .addField("PlayerLevel", playerLevel.toString())
        .addField(blank, blank)
        .addField("PlayerRank", playerRank)
        .addField(blank, blank)
        .addField("PlayerRankRP", playerRankRP.toString())
        .addField(blank, blank)
        .setImage(playerRankImageUrl)
}

function createPredatorPlayerDataEmbed(
    playerName: string,
    playerLevel: number,
    playerRank: string,
    playerRankRP: number,
    playerRanking: number
): Discord.MessageEmbed {
    let blank = '\u200b'
    let predatorIconImage = 
        `https://images-ext-1.discordapp.net/external/0lGvCP8CmGd-HUqpem-120A-dVpNVbN_srCvpE6D-84/https/trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png?width=108&height=108`
    return new Discord.MessageEmbed()
        .setTitle("PlayerStatus")
        .addField("PlayerName", playerName)
        .addField(blank, blank)
        .addField("PlayerLevel", playerLevel.toString())
        .addField(blank, blank)
        .addField("PlayerRank", playerRank)
        .addField(blank, blank)
        .addField("PlayerRankRP", playerRankRP.toString())
        .addField(blank, blank)
        .addField("PlayerRanking", playerRanking.toString())
        .addField(blank, blank)
        .setImage(predatorIconImage)
}