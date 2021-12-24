import { Client, Guild } from 'discord.js'
import { SqlDataManager } from '../sql/sqldatamanager'
import { CommandChannel } from './commandchannel'

/**
 * コマンド専用チャンネルの情報をデータベースから取得するクラス
 * 
 * @property {@link serverId} ディスコードサーバーのID
 */
export class CommandChannelLoader {

    private serverId: string
    
    constructor(serverId: string) {
        this.serverId = serverId
    }

    /**
     * データベースサーバーに保存されている全てのコマンド専用チャンネルの情報を取得するメソッド
     * 
     * @returns チャンネルの情報を{@link CommandChannel}に入れ、それを配列として返す
     */
    public async getAllCommandChannels(): Promise<Array<CommandChannel>> {
        let commandChannels: Array<CommandChannel> = []
        let commandChannelsData = await new SqlDataManager("command_channel").select()
        commandChannelsData.forEach(function (data) {
            commandChannels.push(new CommandChannel(data.serverid, data.channelid))
        })
        return commandChannels
    }

    /**
     * {@link serverId}に適応したコマンド専用チャンネルをデータベースから取得するメソッド
     * * もし適応したチャンネルが見つからなかった場合はundefinedが返る
     * 
     * @returns {@link serverId}に適応したチャンネルを{@link CommandChannel}として返す
     */
    public async getCommandChannel(): Promise<CommandChannel | undefined> {
        let commandChannels = await this.getAllCommandChannels()
        for (let i = 0; i < commandChannels.length; i++) {
            if (commandChannels[i].serverId !== this.serverId) continue
            return commandChannels[i]
        }
    }

    /**
     * コマンド専用チャンネルのIDを取得するメソッド
     * データベースからディスコードサーバーIDに適応したコマンドチャンネルを取得する処理だが
     * *もしチャンネルが見つからなかった場合はデフォルトのコマンドチャンネル名と同じチャンネル名を持つチャンネルを
     * *探して、そのチャンネルのIDを返す
     * 
     * @param client ディスコードのボットを管理するクラス
     * @returns コマンド専用チャンネルのIDを返す
     */
    public async getCommandChannelId(client: Client): Promise<string> {
        let commandChannel = await this.getCommandChannel()
        if (commandChannel === undefined) {
            let guild = await client.guilds.fetch(this.serverId)
            return this.getDefaultCommandChannelId(guild)
        }
        return commandChannel.channelId
    }

    /**
     * コマンド専用チャンネルがセットされているか確認するメソッド
     * 
     * @returns セットされていたらtrue、されていなかったらfalseを返す
     */
    public async isCommandChannelSet(): Promise<Boolean> {
        let commandChannels = await this.getAllCommandChannels()
        return commandChannels.some(ch => ch.serverId === this.serverId)
    }

    // デフォルトのコマンドチャンネル名を持つチャンネルをディスコードサーバーから取得するメソッド
    private getDefaultCommandChannelId(guild: Guild): string {
        let defaultCommandChannel = guild.channels.cache.find(ch => ch.name === process.env.DEFAULT_RANK_CHANNEL)
        if (defaultCommandChannel === undefined) throw console.error("The guild must have command channel.")
        return defaultCommandChannel.id
    }
}