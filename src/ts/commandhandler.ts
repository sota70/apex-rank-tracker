import { CommandInteraction } from 'discord.js'
import { PlayerDataLoader } from './jsonplayerdatagetter'
import { commandNames } from './commandtype'
import { JsonFileManager } from './jsonfilemanager'
import { PlayerStatusEmbedBuilder } from './playerstatusembedbuilder'
import * as displayrank from './displayrank'
import * as commandChannelSetter from './commandchannelsetter'

export class CommandHandler {

    private interaction: CommandInteraction

    constructor(interaction: CommandInteraction) {
        this.interaction = interaction
    }

    public handle() {
        if (!this.interaction.isCommand()) return
        switch (this.interaction.commandName) {
            case commandNames.APEX:
                this.handleApexCommand()
                break
            case commandNames.APEXALIASE:
                this.handleApexCommand()
                break
            case commandNames.SETCOMMANDCHANNEL:
                this.handleSetCommandChannelCommand()
                break
            case commandNames.SETCOMMANDCHANNELALIASE:
                this.handleSetCommandChannelCommand()
                break
            case commandNames.SETUSERNAME:
                this.handleSetUsernameCommand()
                break
            case commandNames.SETUSERNAMEALIASE:
                this.handleSetUsernameCommand()
                break
            case commandNames.TIMERSTART:
                this.handleTimerStartCommand()
                break
            case commandNames.TIMERSTARTALIASE:
                this.handleTimerStartCommand()
                break
            default:
                this.interaction.reply({ content: "予期せぬ例外が発生しました", ephemeral: true })
        }
    }

    private async handleApexCommand() {
        const { options } = this.interaction
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
            this.interaction.reply({ ephemeral: true, content: `Couldn't find the player` })
            return
        }
        let embedMessage = 
            new PlayerStatusEmbedBuilder(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking).build()
        this.interaction.reply({ ephemeral: true, embeds: [embedMessage] })
    }

    private handleSetCommandChannelCommand() {
        const { options, guild } = this.interaction
        let commandChannelName = options.getString("channel")
        let newCommandChannel = guild?.channels.cache.find(ch => ch.name === commandChannelName) 
        if (newCommandChannel === undefined) {
            this.interaction.reply({ content: "Couldn't find the channel", ephemeral: true })
            return
        }
        commandChannelSetter.setCommandChannel(guild?.id!, newCommandChannel?.id!)
        this.interaction.reply({ 
            content: `The command channel has been set to ${newCommandChannel?.name}`,
            ephemeral: true
        })
    }

    private handleSetUsernameCommand() {
        const { options, user, guildId } = this.interaction
        let username = options.getString("username", true)
        let platform = options.getString("platform", true)
        let jsonFileManager = new JsonFileManager()
        jsonFileManager.writeData(user, username, platform, guildId!)
        this.interaction.reply({
            content: `ユーザーネームを${username}に、プラットフォームを${platform}に設定しました`,
            ephemeral: true
        })
    }

    private handleTimerStartCommand() {
        const { client } = this.interaction
        displayrank.startTimer(client)
        this.interaction.reply({
            content: "タイマーがスタートしました",
            ephemeral: true
        })
    }
}