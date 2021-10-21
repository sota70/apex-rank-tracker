import { CommandExecuteEvent } from "../event/commandexecuteevent";
import { EventListener } from "./eventlistener";
import { commandNames } from "../command/commandname";
import { PlayerDataLoader } from "../jsonplayerdatagetter";
import { PlayerStatusEmbedBuilder } from "../playerstatusembedbuilder";
import { CommandChannelSetter } from "../commandchannelsetter";
import { JsonFileManager } from "../jsonfilemanager";
import * as displayrank from '../displayrank'

export class CommandExecuteListener implements EventListener {

    public handle(event: CommandExecuteEvent) {
        if (!event.interaction.isCommand()) return
        switch (event.interaction.commandName) {
            case commandNames.APEX:
                this.handleApexCommand(event)
                break
            case commandNames.APEXALIASE:
                this.handleApexCommand(event)
                break
            case commandNames.SETCOMMANDCHANNEL:
                this.handleSetCommandChannelCommand(event)
                break
            case commandNames.SETCOMMANDCHANNELALIASE:
                this.handleSetCommandChannelCommand(event)
                break
            case commandNames.SETUSERNAME:
                this.handleSetUsernameCommand(event)
                break
            case commandNames.SETUSERNAMEALIASE:
                this.handleSetUsernameCommand(event)
                break
            case commandNames.TIMERSTART:
                this.handleTimerStartCommand(event)
                break
            case commandNames.TIMERSTARTALIASE:
                this.handleTimerStartCommand(event)
                break
        }
    }

    private async handleApexCommand(event: CommandExecuteEvent) {
        const { options } = event.interaction
        let username = options.getString("username", true)
        let platform = options.getString("platform", true)
        let playerDataLoader = new PlayerDataLoader()
        let apexUserData = await playerDataLoader.obtainPlayerData(username, platform)
        let playerName = apexUserData.playerName
        let playerLevel = apexUserData.playerLevel
        let playerRank = apexUserData.playerRank
        let playerRankImage = apexUserData.playerRankImage
        let playerRankRP = apexUserData.playerRankRP
        let playerRanking = apexUserData.playerRanking
        if (playerName === "None") {
            event.interaction.reply({ ephemeral: true, content: `Couldn't find the player` })
            return
        }
        let embedMessage = 
            new PlayerStatusEmbedBuilder(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking).build()
        event.interaction.reply({ ephemeral: true, embeds: [embedMessage] })
    }

    private handleSetCommandChannelCommand(event: CommandExecuteEvent) {
        const { options, guild } = event.interaction
        let commandChannelName = options.getString("channel")
        let newCommandChannel = guild?.channels.cache.find(ch => ch.name === commandChannelName)
        if (newCommandChannel === undefined) {
            event.interaction.reply({ content: "Couldn't find the channel", ephemeral: true })
            return
        }
        new CommandChannelSetter(guild?.id!, newCommandChannel?.id!).setCommandChannel()
        event.interaction.reply({ 
            content: `The command channel has been set to ${newCommandChannel?.name}`,
            ephemeral: true
        })
    }

    private handleSetUsernameCommand(event: CommandExecuteEvent) {
        const { options, user, guildId } = event.interaction
        let username = options.getString("username", true)
        let platform = options.getString("platform", true)
        let jsonFileManager = new JsonFileManager()
        jsonFileManager.writeData(user, username, platform, guildId!)
        event.interaction.reply({
            content: `ユーザーネームを${username}に、プラットフォームを${platform}に設定しました`,
            ephemeral: true
        })
    }

    private handleTimerStartCommand(event: CommandExecuteEvent) {
        const { client } = event.interaction
        displayrank.startTimer(client)
        event.interaction.reply({
            content: "タイマーがスタートしました",
            ephemeral: true
        })
    }
}