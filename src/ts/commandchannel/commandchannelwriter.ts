import { CommandChannelLoader } from "./commandchannelreader"
import * as sqlDataEditor from '../sqldataeditor'

export class CommandChannelSetter {

    private serverId: string
    private channelId: string
    private commandChannelLoader: CommandChannelLoader

    constructor(serverId: string, channelId: string) {
        this.serverId = serverId
        this.channelId = channelId
        this.commandChannelLoader = new CommandChannelLoader(serverId)
    }
    
    public async setCommandChannel() {
        let rows = new Map<string, any>([
            ["serverId", this.serverId],
            ["channelId", this.channelId]
        ])
        let conditions = new Map<string, any>([
            ["serverId", this.serverId]
        ])
        let isCommandChannelSet = await this.commandChannelLoader.isCommandChannelSet()
        if (!isCommandChannelSet) {
            sqlDataEditor.insert("command_channel", rows)
            console.log(`${this.channelId} has been set to ${this.serverId}`)
            return
        }
        sqlDataEditor.update("command_channel", rows, conditions)
        console.log(`${this.channelId} has been set to ${this.serverId}`)
    }
}