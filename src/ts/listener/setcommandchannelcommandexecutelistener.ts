import { CommandChannelSetter } from "../commandchannel/commandchannelwriter";
import { CommandExecuteEvent } from "../event/commandexecuteevent";
import { EventListener } from "./eventlistener";

/**
 * ディスコードのサーバーのコマンドチャンネルを指定するコマンドが呼び出されたときの処理をするリスナークラス
 */
export class SetCommandChannelCommandExecuteListener implements EventListener {

    /**
     * ディスコードのサーバーのコマンドチャンネルを指定するコマンドが呼び出されたときの処理をするメソッド
     * * そのディスコードサーバーのIDとコマンドチャンネルに指定したチャンネルIDをセットでデータベースに保存する
     * 
     * @param event コマンド呼び出しを検知するイベント
     */
    public handle(event: CommandExecuteEvent) {
        if (event.commandName !== 'setcommandchannel' && event.commandName !== 'scc') return
        const { options, guild } = event.interaction
        let commandChannelName = options.getString('channel')
        let newCommandChannel = guild?.channels.cache.find(ch => ch.name === commandChannelName)
        if (newCommandChannel === undefined) {
            event.interaction.reply({ ephemeral: true, content: `Couldn't find the channel` })
            return
        }
        new CommandChannelSetter(guild?.id!, newCommandChannel?.id!).setCommandChannel()
        event.interaction.reply({
            ephemeral: true,
            content: `The command channel has been set to ${newCommandChannel.name}`
        })
    }
}