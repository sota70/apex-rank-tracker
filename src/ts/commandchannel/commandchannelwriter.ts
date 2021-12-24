import { SqlDataManager } from "../sql/sqldatamanager"
import { CommandChannelLoader } from "./commandchannelreader"

/**
 * コマンド専用チャンネルをセットするために使うクラス
 * 
 * @property {@link serverId} ディスコードサーバーのID
 * @property {@link channelId} コマンド専用チャンネルにしたいチャンネルのID
 * @property {@link commandChannelLoader} コマンド専用チャンネルのデータ取得用クラス
 */
export class CommandChannelSetter {

    private serverId: string
    private channelId: string
    private commandChannelLoader: CommandChannelLoader

    constructor(serverId: string, channelId: string) {
        this.serverId = serverId
        this.channelId = channelId
        this.commandChannelLoader = new CommandChannelLoader(serverId)
    }
    
    /**
     * コマンド専用チャンネルをセットするメソッド
     * {@link serverId}と{@link channelId}をセットでデータベースに保存する
     * 
     * @returns 
     */
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