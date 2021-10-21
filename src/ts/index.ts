import * as env from 'dotenv'
import * as http from 'http'
import * as command from './command/command'
import * as commandChannelSetter from './commandchannelsetter'
import * as pg from 'pg'
import * as sqlDataEditor from './sqldataeditor'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { PlayerDataLoader } from './jsonplayerdatagetter'
import { JsonFileManager } from './jsonfilemanager'
import { Intents, Client, ClientApplication } from 'discord.js'
import { CommandChannelLoader } from './commandchannelloader'
import { CommandExecuteEvent } from './event/commandexecuteevent'
import { Event } from './event/event'

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
    ].map(c => c.toJSON())
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
    callEvent(new CommandExecuteEvent(interaction))
})

function loginToClient() {
    if (process.env.TOKEN == undefined) {
        console.log("TOKENが設定されていません")
        process.exit(0)
    }
    client.login(process.env.TOKEN)
}

function callEvent(event: Event) {
    event.eventListener.handle(event)
}