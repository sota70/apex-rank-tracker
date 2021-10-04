import * as env from 'dotenv'
import * as Discord from 'discord.js'
import * as http from 'http'
import * as querystring from 'querystring'
import * as command from './commandtype'
import * as displayrank from './displayrank'
import { CommandHandler } from './commandhandler'
import { JsonFileManager } from './jsonfilemanager'
import { PlayerDataLoader } from './jsonplayerdatagetter'
import { Intents, Client, ClientApplication } from 'discord.js'

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
    client.application = new ClientApplication(client, {})
    await client.application.fetch()
    await registerCommands()
    displayrank.startTimer(client)
})

/* ボットを動かしているサーバーに送られてきたメソッドメソッドを受け取り、処理するメソッド*/
http.createServer(function (req, res) {
    if (req.method == "POST") {
        var data = ''
        req.on("data", function (chunk) { data += chunk })
        req.on("end", function () {
            if (!data) {
                res.end("No Post Data")
                return
            }
            var dataObject = querystring.parse(data)
            console.log(`post: ${dataObject.type}`)
            if (dataObject.type == "wake") {
                console.log("Woke up in post")
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

/*
 * コマンドを登録するメソッド
 */
async function registerCommands() {
    let guild = await client.guilds.fetch(guildId)
    let commands = [
        command.apexCommand,
        command.apexAliaseCommand,
        command.setCommandChannelCommand,
        command.setCommandChannelAliaseCommand,
        command.setUsernameCommand,
        command.setUsernameAliaseCommand,
        command.timerstartCommand,
        command.timerstartAliaseCommand
    ]
    guild.commands.set(commands)
}

/* 
 * プレイヤーが打ったメッセージからコマンドを検知して、それぞれのコマンドに適応した処理をするメソッド
 */
client.on('interactionCreate', async function (interaction) {
    if (!interaction.isCommand()) return
    let commandHandler = new CommandHandler(interaction)
    commandHandler.handle()
    // const { commandName, options, channel, guild } = interaction
    // const commandNames = command.commandNames
    // if (channel?.id !== commandChannelSetter.getCommandChannelId(guild?.id!)) return
    // if (commandName === commandNames.APEX || commandName === commandNames.APEXALIASE) {
    //     let username = options.getString("username", true)
    //     let platform = options.getString("platform", true)
    //     let playerDataLoader = new PlayerDataLoader()
    //     let apexUserData = await playerDataLoader.obtainPlayerData(username, platform)
    //     let playerName = apexUserData.playerName
    //     let playerLevel = apexUserData.playerLevel
    //     let playerRank = apexUserData.playerRank
    //     let playerRankImage = apexUserData.playerRankImage
    //     let playerRankRP = apexUserData.playerRankRP
    //     let playerRanking = apexUserData.playerRanking
    //     let embedMessage = 
    //         createMessageEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking, playerRankImage)
    //     interaction.reply({ ephemeral: true, embeds: [embedMessage] })
    // }
    // if (commandName === commandNames.SETCOMMANDCHANNEL || commandName === commandNames.SETCOMMANDCHANNELALIASE) {
    //     let commandChannelName = options.getString("channel")
    //     let newCommandChannel = guild?.channels.cache.find(ch => ch.name === commandChannelName)
    //     if (newCommandChannel === undefined) interaction.reply({ content: "Couldn't find the channel", ephemeral: true })
    //     console.log(`NewCommandChannelName: ${newCommandChannel?.name}, NewCommandChannelID: ${newCommandChannel?.id}`)
    //     commandChannelSetter.setCommandChannel(guild?.id!, newCommandChannel?.id!)
    //     interaction.reply({ content: `The command channel has been set to ${newCommandChannel?.name}`, ephemeral: true })
    // }
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