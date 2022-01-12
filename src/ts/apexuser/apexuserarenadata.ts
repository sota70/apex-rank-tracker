/**
 * apexプレイヤーのアリーナーデータを保管しておくデータクラス
 * * {@link ApexUserData}の一部として使われる
 * 
 * @property {@link rank} アリーナのランク
 * @property {@link rankIconURL} アリーナのランクのアイコン画像URL
 * @property {@link rankRP} アリーナのランクスコア
 * @property {@link ranking} アリーナのランク順位
 */
export class ApexUserArenaData {

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