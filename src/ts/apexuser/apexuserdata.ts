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