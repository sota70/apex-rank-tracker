import { Register } from "./register"
import * as command from '../command/command'
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"

export class CommandRegister implements Register {

    public async register() {
        const commands = [
            command.showApexStatusCommand,
            command.showApexStatusAliaseCommand,
            command.setCommandChannelCommand,
            command.setCommandChannelAliaseCommand,
            command.setUsernameCommand,
            command.setUsernameAliaseCommand
        ].map(c => c.toJSON())
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN!)
        const clientId = '821655399857127485'
        console.log(commands)
        try {
            console.log('Started refreshing application (/) commands.')
            await rest.put(Routes.applicationCommands(clientId), { body: commands })
            console.log('Successfully reloaded application (/) commands.')
        } catch (err) {
            console.error(err)
        }
    }
}