/**
 * ディスコードサーバーのコマンド専用チャンネルの情報を保存しておく用のデータクラス
 * 
 * @property {@link serverId} ディスコードサーバーのID
 * @property {@link channelId} コマンド専用チャンネルのID
 */
export class CommandChannel {

    public serverId: string
    public channelId: string = "None"

    constructor(serverId: string, channelId: string) {
        this.serverId = serverId
        this.channelId = channelId
    }
}