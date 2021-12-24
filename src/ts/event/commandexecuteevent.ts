import { CommandInteraction } from 'discord.js';
import { SetCommandChannelCommandExecuteListener } from '../listener/setcommandchannelcommandexecutelistener';
import { SetUsernameCommandExecuteListener } from '../listener/setusernamecommandexecutelistener';
import { ShowApexStatusCommandExecuteListener } from '../listener/showapexstatuscommandexecutelistener';
import { Event } from "./event";
import { EventType } from "./eventtype";

/**
 * ディスコードユーザーが打ったコマンドを処理する時に使われるイベントクラス
 * 
 * @property {@link interaction} コマンドのデータの取得および利用が可能なクラス
 * @property {@link commandName} コマンドの名前
 */
export class CommandExecuteEvent extends Event {

    public interaction: CommandInteraction
    public commandName: string

    constructor(interaction: CommandInteraction) {
        super('commandexecuteevent', EventType.COMMAND)
        this.interaction = interaction
        this.commandName = interaction.commandName
    }

    /**
     * {@link CommandExecuteEvent}クラスで使う{@link EventListener}を登録するメソッド
     */
    override registerListeners() {
        this.addEventListener(new ShowApexStatusCommandExecuteListener())
        this.addEventListener(new SetCommandChannelCommandExecuteListener())
        this.addEventListener(new SetUsernameCommandExecuteListener())
    }
}