import { ApexUserDataLoader } from '../apexuser/apexuserdatareader'
import { CommandExecuteEvent } from "../event/commandexecuteevent";
import { PlayerStatusEmbedBuilder } from "../util/playerstatusembedbuilder";
import { EventListener } from "./eventlistener";

/**
 * Apexのプレイヤーステータス表示コマンドが呼び出された時の処理を担当するリスナークラス
 */
export class ShowApexStatusCommandExecuteListener implements EventListener {

    /**
     * Apexのプレイヤーステータス表示コマンドが呼び出されたときの処理をするメソッド
     * * 取得したユーザー名とプラットフォームからステータスを取得し、メッセージとして送信する
     * 
     * @param event コマンド呼び出しを検知するイベント
     */
    public async handle(event: CommandExecuteEvent) {
        if (event.commandName !== 'showapexstatus' && event.commandName !== 'sas') return
        const { options } = event.interaction
        let username = options.getString('username', true)
        let platform = options.getString('platform', true)
        let playerDataLoader = new ApexUserDataLoader(username, platform)
        let apexUserData = await playerDataLoader.getPlayerData()
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