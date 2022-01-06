import { ApexUserArenaData } from "./apexuserarenadata"

export class ApexUserArenaDataBuilder {

    private playerStats: any

    constructor(playerStats: any) {
        this.playerStats = playerStats
    }

    public build(): ApexUserArenaData {
        let rank = this.playerStats.arenaRankScore.metadata.rankName
        let rankIconURL = this.playerStats.arenaRankScore.metadata.iconUrl
        let rankRP = this.playerStats.arenaRankScore.value
        let ranking = this.playerStats.arenaRankScore.rank
        return new ApexUserArenaData(rank, rankIconURL, rankRP, ranking)
    }
}