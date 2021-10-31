import * as env from 'dotenv'
import * as http from 'http'
import * as command from './command/command'
import * as commandChannelSetter from './commandchannel/commandchannelwriter'
import * as pg from 'pg'
import * as sqlDataEditor from './sql/sqldatamanager'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { ApexUserDataLoader } from './apexuser/apexuserdatareader'
import { UserInfoReader } from './userinfo/userinforeader'
import { Intents, Client, ClientApplication } from 'discord.js'
import { CommandChannelLoader } from './commandchannel/commandchannelreader'
import { CommandExecuteEvent } from './event/commandexecuteevent'
import { Event } from './event/event'
import { CommandRegister } from './register/commandregister'
import { ApexUserRoleSetter } from './apexuser/apexuserrolesetter'
import { ServerReceivePostEvent } from './event/serverreceivepostevent'
import { ServerReceiveMethodEvent } from './event/serverreceivemethodevent'

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
    await new CommandRegister().register()
    client.application = new ClientApplication(client, {})
    await client.application.fetch()
})

/* ボットを動かしているサーバーに送られてきたメソッドメソッドを受け取り、処理するメソッド*/
http.createServer(function (req, res) {
    if (req.method === undefined) {
        res.end()
        return
    }
    callServerReceiveMethodEvent(new ServerReceiveMethodEvent(req.method, req, res, client))
}).listen(process.env.PORT || 5000)

function callServerReceiveMethodEvent(event: ServerReceiveMethodEvent) {
    event.eventListeners.forEach(listener => {
        listener.handle(event)
    })
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
    event.eventListeners.forEach(listener =>
        listener.handle(event)
    )
}