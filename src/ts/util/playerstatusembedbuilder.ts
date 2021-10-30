import { MessageEmbed } from "discord.js"

export class PlayerStatusEmbedBuilder {

    private playerName: string
    private playerLevel: number
    private playerRank: string
    private playerRankImage: string
    private playerRankRP: number
    private playerRanking: number

    constructor(
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

    public build(): MessageEmbed {
        let embed
        if (this.isPlayerRankPredator()) {
            embed = this.buildPredatorPlayerStatusEmbed()
        } else {
            embed = this.buildPlayerStatusEmbed()
        }
        return embed
    }

    private buildPlayerStatusEmbed(): MessageEmbed {
        let blank = '\u200b'
        return new MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", this.playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", this.playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", this.playerRank)
            .addField(blank, blank)
            .addField("PlayerRankRP", this.playerRankRP.toString())
            .addField(blank, blank)
            .setImage(this.playerRankImage)
    }

    private buildPredatorPlayerStatusEmbed(): MessageEmbed {
        let blank = '\u200b'
        let predatorIconImage =
            `https://images-ext-1.discordapp.net/external/0lGvCP8CmGd-HUqpem-120A-dVpNVbN_srCvpE6D-84/https/trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png?width=108&height=108`
        return new MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", this.playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", this.playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", "Predator")
            .addField(blank, blank)
            .addField("PlayerRankRP", this.playerRankRP.toString())
            .addField(blank, blank)
            .addField("PlayerRanking", this.playerRanking.toString())
            .addField(blank, blank)
            .setImage(predatorIconImage)
    }

    private isPlayerRankPredator(): Boolean {
        return this.playerRanking <= 750
    }
}