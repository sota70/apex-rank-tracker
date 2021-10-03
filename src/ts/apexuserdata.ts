import { MessageEmbed } from 'discord.js'

export class ApexUserData {

    public playerName: string = "None"
    public playerLevel: number = 0
    public playerRank: string = "None"
    public playerRankImage: string = "None"
    public playerRankRP: number = -1
    public playerRanking: number = -1

    constructor (
        playerName: string,
        playerLevel: number,
        playerRank: string,
        playerRankImage: string,
        playerRankRP: number,
        playerRanking: number
    ) {
        this.playerName = playerName
        this.playerLevel = playerLevel
        this.playerRank = playerRank
        this.playerRankImage = playerRankImage
        this.playerRankRP = playerRankRP
        this.playerRanking = playerRanking
    }

    public createMessageEmbed(
        playerName: string,
        playerLevel: number,
        playerRank: string,
        playerRankRP: number,
        playerRanking: number,
        playerRankImageUrl: string 
    ) {
        let embed
        if (this.isPlayerRankPredator(playerRanking)) {
            embed = this.createPredatorPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking)
        } else {
            embed = this.createPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl)
        }
        return embed
    }

    private isPlayerRankPredator(playerRanking: number): Boolean {
        if (playerRanking === undefined) return false
        return playerRanking <= 750
    }

    private createPlayerDataEmbed(
        playerName: string,
        playerLevel: number,
        playerRank: string,
        playerRankRP: number,
        playerRankImageUrl: string
    ): MessageEmbed {
        let blank = '\u200b'
        return new MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", playerRank)
            .addField(blank, blank)
            .addField("PlayerRankRP", playerRankRP.toString())
            .addField(blank, blank)
            .setImage(playerRankImageUrl)
    }

    private createPredatorPlayerDataEmbed(
        playerName: string,
        playerLevel: number,
        playerRank: string,
        playerRankRP: number,
        playerRanking: number
    ): MessageEmbed {
        let blank = '\u200b'
        let predatorIconImage = 
            `https://images-ext-1.discordapp.net/external/0lGvCP8CmGd-HUqpem-120A-dVpNVbN_srCvpE6D-84/https/trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png?width=108&height=108`
        return new MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", playerRank)
            .addField(blank, blank)
            .addField("PlayerRankRP", playerRankRP.toString())
            .addField(blank, blank)
            .addField("PlayerRanking", playerRanking.toString())
            .addField(blank, blank)
            .setImage(predatorIconImage)
    }
}