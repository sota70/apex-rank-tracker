import { CommandInteraction } from 'discord.js';
import { SetCommandChannelCommandExecuteListener } from '../listener/setcommandchannelcommandexecutelistener';
import { SetUsernameCommandExecuteListener } from '../listener/setusernamecommandexecutelistener';
import { ShowApexStatusCommandExecuteListener } from '../listener/showapexstatuscommandexecutelistener';
import { Event } from "./event";
import { EventType } from "./eventtype";

export class CommandExecuteEvent extends Event {

    public interaction: CommandInteraction
    public commandName: string

    constructor(interaction: CommandInteraction) {
        super('commandexecuteevent', EventType.COMMAND, [])
        this.interaction = interaction
        this.commandName = interaction.commandName
        this.registerEventListeners()
    }

    private registerEventListeners() {
        this.addEventListener(new ShowApexStatusCommandExecuteListener())
        this.addEventListener(new SetCommandChannelCommandExecuteListener())
        this.addEventListener(new SetUsernameCommandExecuteListener())
    }
}