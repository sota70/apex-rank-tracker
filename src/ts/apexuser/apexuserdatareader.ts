import { ApexUserData } from "./apexuserdata"
import * as request from 'request'

export class ApexUserDataLoader {

    private username: string
    private platform: string

    constructor(username: string, platform: string) {
        this.username = username
        this.platform = platform
    }

    public async getPlayerData(): Promise<ApexUserData> {
        let apexUserData = new ApexUserData("None", 0, "None", "None", -1, -1)
        let url = `https://public-api.tracker.gg/apex/v1/standard/profile/${this.checkPlatform()}/${this.username}`
        request.get({
            url: url,
            headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
        }, (err, res, body) => {
            let jsonData = JSON.parse(body)
            if (jsonData.data === undefined) return apexUserData
            let playerName = jsonData.data.metadata.platformUserHandle
            let playerLevel = jsonData.data.metadata.level
            let playerRank = jsonData.data.metadata.rankName
            let playerRankImage = jsonData.data.metadata.rankImage
            let playerRankRP = this.getPlayerRP(jsonData.data.stats)
            let playerRanking = this.getPlayerRanking(jsonData.data.stats)
            apexUserData = new ApexUserData(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking)
        })
        await this.delay()
        return apexUserData
    }

    public getPlayerRP(playerStatistics: Array<any>): any {
        for (let i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore") continue
            return playerStatistics[i].value
        }
    }

    public getPlayerRanking(playerStatistics: Array<any>): any {
        for (let i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore") continue
            return playerStatistics[i].rank
        }
    }

    private checkPlatform(): number {
        switch (this.platform) {
            case "pc": return 5
            case "ps4": return 2
            case "xbox": return 1
            default: return 0
        }
    }

    private delay() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
}