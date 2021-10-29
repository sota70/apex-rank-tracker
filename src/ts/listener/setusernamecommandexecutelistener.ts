import { CommandExecuteEvent } from "../event/commandexecuteevent";
import { UserInfoWriter } from "../userinfo/userinfowriter";
import { EventListener } from "./eventlistener";

export class SetUsernameCommandExecuteListener implements EventListener{

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