export class CommandChannel {

    public serverId: string
    public channelId: string = "None"

    constructor(serverId: string, channelId: string) {
        this.serverId = serverId
        this.channelId = channelId
    }
}