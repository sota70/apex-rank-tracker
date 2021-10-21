import { CommandInteraction } from 'discord.js';
import { CommandExecuteListener } from '../listener/commandexecutelistener'
import { Event } from "./event";
import { EventType } from "./eventtype";

export class CommandExecuteEvent extends Event {

    public interaction: CommandInteraction

    constructor(interaction: CommandInteraction) {
        super('commandexecute', EventType.COMMAND, new CommandExecuteListener())
        this.interaction = interaction
    }
}