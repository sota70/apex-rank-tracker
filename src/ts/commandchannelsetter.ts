import * as fs from 'fs'
import { Client } from 'pg'
import { CommandChannel } from './commandchannel'

export async function setCommandChannel(serverId: string, channelId: string) {
    let commandChannels = await fetchCommandChannels()

    // 一つのサーバーIDに二つ以上のチャンネルIDが入るのを避けるためにフィルターをかけている
    if (await isCommandChannelSet(serverId)) removeCommandChannel(serverId, commandChannels)
    console.log(`${channelId} has been set to ${serverId}`)
    commandChannels.push(new CommandChannel(serverId, channelId))
    fs.writeFileSync("./command-channel.json", JSON.stringify(commandChannels))
}

export async function getCommandChannelId(serverId: string): Promise<string> {
    let commandChannel = await getCommandChannel(serverId)
    if (commandChannel === undefined) return process.env.DEFAULT_RANK_CHANNEL!
    return commandChannel.channelId
}

function removeCommandChannel(serverId: string, commandChannels: Array<CommandChannel>) {
    for (let i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId) continue
        commandChannels.splice(i, 1)
    }
}

async function getCommandChannel(serverId: string): Promise<CommandChannel | undefined> {
    let commandChannels = await fetchCommandChannels()
    for (let i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId) continue
        return commandChannels[i]
    }
}

async function isCommandChannelSet(serverId: string): Promise<Boolean> {
    let commandChannels = await fetchCommandChannels()
    let dataExists = false
    for (let i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId) continue
        dataExists = true
    } 
    return dataExists
}

async function fetchCommandChannels(): Promise<Array<CommandChannel>> {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
    let commandChannels: Array<CommandChannel> = []
    client.connect()
    client.query("SELECT serverId, channelId FROM command_channel;", (err, res) => {
        if (err) throw err
        res.rows.forEach(function (row) {
            let serverId = JSON.parse(JSON.stringify(row.serverid))
            let channelId = JSON.parse(JSON.stringify(row.channelid))
            commandChannels.push(new CommandChannel(serverId, channelId))
        })
        client.end()
    })
    await delay(2)
    return commandChannels
}

function delay(sec: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000)
    })
}