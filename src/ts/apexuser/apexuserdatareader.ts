import { ApexUserData } from "./apexuserdata"
import * as request from 'request'

/**
 * apexプレイヤーのデータを取得するクラス
 * 
 * @property {@link username} プレイヤー名
 * @property {@link platform} プレイヤーのプラットフォーム
 */
export class ApexUserDataLoader {

    private username: string
    private platform: string

    constructor(username: string, platform: string) {
        this.username = username
        this.platform = platform
    }

    /**
     * {@link username}からプレイヤーデータを取得するメソッド
     * 外部のapiを使い、そこから返ってきたデータを{@link ApexUserData}に格納する
     * もしプレイヤーが見つからなかった場合はnullを返す
     * * データが返ってくるまで遅延が生じるので、それを解決するために約1秒の遅延を設けている
     * 
     * @returns プレイヤーデータを{@link ApexUserData}型で返す
     */
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

    /**
     * 取得したプレイヤーのデータからランクポイントを取得するメソッド
     * 
     * @param playerStatistics プレイヤーの統計データ
     * @returns プレイヤーのランクポイントを返す
     */
    public getPlayerRP(playerStatistics: Array<any>): any {
        for (let i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore") continue
            return playerStatistics[i].value
        }
    }

    /**
     * 取得したプレイヤーのデータからランク順位を取得するメソッド
     * 
     * @param playerStatistics プレイヤーの統計データ
     * @returns プレイヤーのランク順位を返す
     */
    public getPlayerRanking(playerStatistics: Array<any>): any {
        for (let i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore") continue
            return playerStatistics[i].rank
        }
    }

    // apiを使う用にプラットフォームを数字に変更するメソッド
    private checkPlatform(): number {
        switch (this.platform) {
            case "pc": return 5
            case "ps4": return 2
            case "xbox": return 1
            default: return 0
        }
    }

    // 1秒間の遅延を発生させるメソッド
    private delay() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
}