import { ApexUserData } from "./apexuserdata"
import * as request from 'request'
import { ApexUserBattleRoyalData } from "./apexuserbattleroyaldata"
import { ApexUserArenaData } from "./apexuserarenadata"
import { ApexUserBattleRoyalDataBuilder } from "./apexuserbattleroyaldatabuilder"
import { ApexUserArenaDataBuilder } from "./apexuserarenadatabuilder"

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
        let apexUserData = 
            new ApexUserData("", 0, new ApexUserBattleRoyalData("", "", -1, -1), new ApexUserArenaData("", "", -1, -1))
        let url = `https://public-api.tracker.gg/v2/apex/standard/profile/${this.platform}/${this.username}`
        let requestOptions = {
            url: url,
            headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
        }
        request.get(requestOptions, (err, res, body) => {
            let jsonData = JSON.parse(body)
            if (jsonData.data === undefined) return apexUserData
            let playerName = jsonData.data.platformInfo.platformUserId
            let playerStats = jsonData.data.segments[0].stats
            let playerLevel = playerStats.level.value
            let battleRoyalData = new ApexUserBattleRoyalDataBuilder(playerStats).build()
            let arenaData = new ApexUserArenaDataBuilder(playerStats).build()
            apexUserData = new ApexUserData(playerName, playerLevel, battleRoyalData, arenaData)
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
    public getPlayerBattleRoyalRP(playerStats: any): number {
        return playerStats.rankScore.value
    }

    /**
     * 取得したプレイヤーのデータからランク順位を取得するメソッド
     * 
     * @param playerStatistics プレイヤーの統計データ
     * @returns プレイヤーのランク順位を返す
     */
    public getPlayerRanking(playerStats: any): number {
        return playerStats.rankScore.rank
    }

    // 1秒間の遅延を発生させるメソッド
    private delay() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
}