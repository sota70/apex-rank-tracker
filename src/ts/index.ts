import * as env from 'dotenv'
import * as http from 'http'
import { Intents, Client, ClientApplication } from 'discord.js'
import { CommandChannelLoader } from './commandchannel/commandchannelreader'
import { CommandExecuteEvent } from './event/commandexecuteevent'
import { Event } from './event/event'
import { CommandRegister } from './register/commandregister'
import { ServerReceiveMethodEvent } from './event/serverreceivemethodevent'
const config = env.config()
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

/**
 * TOKENと適するボットとしてログインする
 */
loginToClient()

/**
 * ディスコードクライアントの準備完了時の処理
 * ClientApplicationの定義、SlashCommandの登録を行う
 * 
 * @notExported
 */
client.on('ready',async () => {
    console.log(`${client.user?.tag}でログインしています`)
    console.log('準備完了')
    await new CommandRegister().register()
    client.application = new ClientApplication(client, {})
    await client.application.fetch()
})

/**
 * ボットを動かしているサーバーに送られてきたメソッドメソッドを受け取り、処理するメソッド
 * * 送られてきたメッセージはすべてListenerクラスで処理している
 * 
 * @notExported
 */
http.createServer(function (req, res) {
    if (req.method === undefined) {
        res.end()
        return
    }
    callEvent(new ServerReceiveMethodEvent(req.method, req, res, client))
}).listen(process.env.PORT || 5000)

/**
 * プレイヤーが打ったメッセージからコマンドを検知して、それぞれのコマンドに適応した処理をするメソッド
 * * コマンド処理はすべてListenerクラスで処理している
 * 
 * @notExported
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

/**
 * ディスコードクライアントにログインするメソッド
 * 
 * @notExported
 * @package
 */
function loginToClient() {
    if (process.env.TOKEN == undefined) {
        console.log("TOKENが設定されていません")
        process.exit(0)
    }
    client.login(process.env.TOKEN)
}

/**
 * イベントを呼び出すメソッド
 * 
 * @param event イベント
 * @notExported
 * @module Main
 */
function callEvent(event: Event) {
    event.eventListeners.forEach(listener =>
        listener.handle(event)
    )
}