import { CommandExecuteEvent } from "../event/commandexecuteevent";
import { UserInfoWriter } from "../userinfo/userinfowriter";
import { EventListener } from "./eventlistener";

/**
 * ユーザー名を設定するコマンドが呼び出されたときの処理をするリスナークラス
 */
export class SetUsernameCommandExecuteListener implements EventListener{

    /**
     * ユーザー名を設定するコマンドが呼び出されたときの処理をするメソッド
     * * ユーザー名とプラットフォームをコマンドを実行したディスコードユーザーIDと一緒にデータベースに保存する
     * 
     * @param event コマンド呼び出しを検知するイベント
     */
    public handle(event: CommandExecuteEvent) {
        if (event.commandName !== 'setusername' && event.commandName !== 'sun') return
        const { options, user, guildId } = event.interaction
        let username = options.getString('username', true)
        let platform = options.getString('platform', true)
        let userInfoWriter = new UserInfoWriter(user.id, username, platform, guildId!)
        userInfoWriter.writeData()
        event.interaction.reply({
             ephemeral: true,
             content: `Set username to ${username} and set platform to ${platform}`
        })
    }
}