import { CommandChannelSetter } from "../commandchannel/commandchannelwriter";
import { CommandExecuteEvent } from "../event/commandexecuteevent";
import { EventListener } from "./eventlistener";

export class SetCommandChannelCommandExecuteListener implements EventListener {

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