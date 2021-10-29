import { Client, Guild } from 'discord.js'
import { SqlDataManager } from '../sql/sqldatamanager'
import { CommandChannel } from './commandchannel'

export class CommandChannelLoader {

    private serverId: string
    
    constructor(serverId: string) {
        this.serverId = serverId
    }

    public async getAllCommandChannels(): Promise<Array<CommandChannel>> {
        let commandChannels: Array<CommandChannel> = []
        let commandChannelsData = await new SqlDataManager("command_channel").select()
        commandChannelsData.forEach(function (data) {
            commandChannels.push(new CommandChannel(data.serverid, data.channelid))
        })
        return commandChannels
    }

    public async getCommandChannel(): Promise<CommandChannel | undefined> {
        let commandChannels = await this.getAllCommandChannels()
        for (let i = 0; i < commandChannels.length; i++) {
            if (commandChannels[i].serverId !== this.serverId) continue
            return commandChannels[i]
        }
    }

    public async getCommandChannelId(client: Client): Promise<string> {
        let commandChannel = await this.getCommandChannel()
        if (commandChannel === undefined) {
            let guild = await client.guilds.fetch(this.serverId)
            return this.getDefaultCommandChannelId(guild)
        }
        return commandChannel.channelId
    }

    public async isCommandChannelSet(): Promise<Boolean> {
        let commandChannels = await this.getAllCommandChannels()
        return commandChannels.some(ch => ch.serverId === this.serverId)
    }

    private getDefaultCommandChannelId(guild: Guild): string {
        let defaultCommandChannel = guild.channels.cache.find(ch => ch.name === process.env.DEFAULT_RANK_CHANNEL)
        if (defaultCommandChannel === undefined) throw console.error("The guild must have command channel.")
        return defaultCommandChannel.id
    }
}