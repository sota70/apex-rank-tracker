import { PlayerDataLoader } from "../apexuser/jsonplayerdatagetter";
import { CommandExecuteEvent } from "../event/commandexecuteevent";
import { PlayerStatusEmbedBuilder } from "../playerstatusembedbuilder";
import { EventListener } from "./eventlistener";

export class ShowApexStatusCommandExecuteListener implements EventListener {

    public async handle(event: CommandExecuteEvent) {
        if (event.commandName !== 'showapexstatus' && event.commandName !== 'sas') return
        const { options } = event.interaction
        let username = options.getString('username', true)
        let platform = options.getString('platform', true)
        let playerDataLoader = new PlayerDataLoader()
        let apexUserData = await playerDataLoader.obtainPlayerData(username, platform)
        let playerName = apexUserData.playerName
        let playerLevel = apexUserData.playerLevel
        let playerRank = apexUserData.playerRank
        let playerRankImage = apexUserData.playerRankImage
        let playerRankRP = apexUserData.playerRankRP
        let playerRanking = apexUserData.playerRanking
        if (playerName === 'None') {
            event.interaction.reply({ ephemeral: true, content: `Couldn't find the player` })
            return
        }
        let embedMessage =
            new PlayerStatusEmbedBuilder(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking).build()
        event.interaction.reply({ ephemeral: true, embeds: [embedMessage] })
    }
}