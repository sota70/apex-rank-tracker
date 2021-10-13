import { Client, Guild } from 'discord.js'
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
    sqlDataEditor.update("command_channel", rows, "serverId", serverId)
    console.log(`${channelId} has been set to ${serverId}`)
}

export async function getCommandChannelId(serverId: string, client: Client): Promise<string> {
    let commandChannel = await getCommandChannel(serverId)
    if (commandChannel === undefined) {
        let guild = await client.guilds.fetch(serverId)
        return getDefaultCommandChannelId(guild)
    }
    return commandChannel.channelId
}

function getDefaultCommandChannelId(guild: Guild): string {
    let defaultCommandChannel = guild.channels.cache.find(ch => ch.name === process.env.DEFAULT_RANK_CHANNEL)
    if (defaultCommandChannel === undefined) throw console.error("The guild must have command channel.");
    return defaultCommandChannel.id   
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
}