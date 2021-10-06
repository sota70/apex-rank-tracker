import { CommandChannel } from './commandchannel'
import * as sqlDataEditor from './sqldataeditor'

export async function setCommandChannel(serverId: string, channelId: string) {
    let rows = new Map<string, any>([
        ["serverId", serverId],
        ["channelId", channelId]
    ])
    if (!await isCommandChannelSet(serverId)) {
        sqlDataEditor.insert("command_channel", rows)
        console.log(`${channelId} has been set to ${serverId}`)
        return
    }
    sqlDataEditor.update("command_channel", rows)
    console.log(`${channelId} has been set to ${serverId}`)
}

export async function getCommandChannelId(serverId: string): Promise<string> {
    let commandChannel = await getCommandChannel(serverId)
    if (commandChannel === undefined) return process.env.DEFAULT_RANK_CHANNEL!
    return commandChannel.channelId
}

async function getCommandChannel(serverId: string): Promise<CommandChannel | undefined> {
    let commandChannels = await fetchCommandChannels()
    for (let i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId) continue
        return commandChannels[i]
    }
}

export async function isCommandChannelSet(serverId: string): Promise<Boolean> {
    let commandChannels = await fetchCommandChannels()
    return commandChannels.some(ch => ch.serverId === serverId)
}

export async function fetchCommandChannels(): Promise<Array<CommandChannel>> {
    let commandChannels: Array<CommandChannel> = []
    let rows = await sqlDataEditor.select("command_channel")
    rows.forEach(function (row) {
        let serverId = JSON.parse(JSON.stringify(row.serverid))
        let channelId = JSON.parse(JSON.stringify(row.channelid))
        commandChannels.push(new CommandChannel(serverId, channelId))
    })
    return commandChannels
    // let client = new Client({
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: { rejectUnauthorized: false }
    // })
    // client.connect()
    // client.query("SELECT serverId, channelId FROM command_channel;", (err, res) => {
    //     if (err) throw err
    //     res.rows.forEach(function (row) {
    //         let serverId = JSON.parse(JSON.stringify(row.serverid))
    //         let channelId = JSON.parse(JSON.stringify(row.channelid))
    //         commandChannels.push(new CommandChannel(serverId, channelId))
    //     })
    //     client.end()
    // })
    // await delay(1)
    // return commandChannels
}