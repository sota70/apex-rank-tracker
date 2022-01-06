import { ApexUserData } from "./apexuserdata"

/**
 * apexプレイヤーのバトルロワイヤルのデータを保管しておくデータクラス
 * * {@link ApexUserData}の一部として使われる
 * 
 * @property {@link rank} バトルロワイヤルのランク
 * @property {@link rankIconURL} バトルロワイヤルのランクアイコンの画像URL
 * @property {@link rankRP} バトルロワイヤルランクのランクスコア
 * @property {@link ranking} バトルロワイヤルのランク順位
 */
export class ApexUserBattleRoyalData {

    public rank: string = ""
    public rankIconURL: string = ""
    public rankRP: number = -1
    public ranking: number | undefined

    constructor(
        rank: string,
        rankIconURL: string,
        rankRP: number,
        ranking: number | undefined
    ) {
        this.rank = rank
        this.rankIconURL = rankIconURL
        this.rankRP = rankRP
        this.ranking = ranking
    }
}