import * as fs from 'fs'
import { CommandChannel } from './commandchannel'

export function setCommandChannel(serverId: string, channelId: string) {
    let commandChannels = fetchCommandChannels()

    // 一つのサーバーIDに二つ以上のチャンネルIDが入るのを避けるためにフィルターをかけている
    if (isCommandChannelSet(serverId)) removeCommandChannel(serverId, commandChannels)
    console.log(`${channelId} has been set to ${serverId}`)
    commandChannels.push(new CommandChannel(serverId, channelId))
    fs.writeFileSync("./command-channel.json", JSON.stringify(commandChannels))
}

export function getCommandChannelId(serverId: string): string {
    let commandChannel = getCommandChannel(serverId)
    if (commandChannel === undefined) return process.env.DEFAULT_RANK_CHANNEL!
    return commandChannel.channelId
}

function removeCommandChannel(serverId: string, commandChannels: Array<CommandChannel>) {
    for (let i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId) continue
        commandChannels.splice(i, 1)
    }
}

function getCommandChannel(serverId: string): CommandChannel | undefined {
    let commandChannels = fetchCommandChannels()
    for (let i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId) continue
        return commandChannels[i]
    }
}

function isCommandChannelSet(serverId: string): Boolean {
    let commandChannels = fetchCommandChannels()
    let dataExists = false
    for (let i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId) continue
        dataExists = true
    } 
    return dataExists
}

function fetchCommandChannels(): Array<CommandChannel> {
    return JSON.parse(fs.readFileSync("./command-channel.json", "utf-8"))
}