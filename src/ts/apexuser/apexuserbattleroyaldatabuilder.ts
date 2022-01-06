import { ApexUserBattleRoyalData } from "./apexuserbattleroyaldata"

export class ApexUserBattleRoyalDataBuilder {

    private playerStats: any

    constructor(playerStats: any) {
        this.playerStats = playerStats
    }

    public build(): ApexUserBattleRoyalData {
        let rank = this.playerStats.rankScore.metadata.rankName
        let rankIconURL = this.playerStats.rankScore.metadata.iconUrl
        let rankRP = this.playerStats.rankScore.value
        let ranking = this.playerStats.rankScore.rank
        return new ApexUserBattleRoyalData(rank, rankIconURL, rankRP, ranking)
    }
}