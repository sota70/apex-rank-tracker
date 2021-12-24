/**
 * apexプレイヤーのデータを格納する用のデータクラス
 * 基本的にはapiを叩いて取得したプレイヤーデータをこのクラスに入れる時に使われる
 * 
 * @property {@link playerName} プレイヤーの名前
 * @property {@link playerLevel} プレイヤーのレベル
 * @property {@link playerRank} プレイヤーのランク
 * @property {@link playerRankImage} プレイヤーのランクに適応したアイコン
 * @property {@link playerRankRP} プレイヤーのランクのポイント
 * @property {@link playerRanking} プレイヤーのランクの順位
 */
export class ApexUserData {

    public playerName: string = "None"
    public playerLevel: number = 0
    public playerRank: string = "None"
    public playerRankImage: string = "None"
    public playerRankRP: number = -1
    public playerRanking: number = -1

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
}