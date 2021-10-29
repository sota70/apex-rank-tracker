import { SqlDataManager } from "../sql/sqldatamanager"
import { CommandChannelLoader } from "./commandchannelreader"

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
        let data = new Map<string, any>([
            ["serverId", this.serverId],
            ["channelId", this.channelId]
        ])
        let conditions = new Map<string, any>([
            ["serverId", this.serverId]
        ])
        let isCommandChannelSet = await this.commandChannelLoader.isCommandChannelSet()
        let sqlDataManager = new SqlDataManager("command_channel")
        if (!isCommandChannelSet) {
            sqlDataManager.insert(data)
            console.log(`${this.channelId} has been set to ${this.serverId}`)
            return
        }
        sqlDataManager.update(data, conditions)
        console.log(`${this.channelId} has been set to ${this.serverId}`)
    }
}