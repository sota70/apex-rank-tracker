import { ApexUserArenaData } from "./apexuserarenadata"
import { ApexUserBattleRoyalData } from "./apexuserbattleroyaldata"

/**
 * apexプレイヤーのデータを格納する用のデータクラス
 * 基本的にはapiを叩いて取得したプレイヤーデータをこのクラスに入れる時に使われる
 * 
 * @property {@link playerName} プレイヤーの名前
 * @property {@link playerLevel} プレイヤーのレベル
 * @property {@link ApexUserBattleRoyalData} プレイヤーのバトルロワイヤルのデータ
 * @property {@link ApexUserArenaData} プレイヤーのアリーナのデータ
 */
export class ApexUserData {

    public playerName: string = ""
    public playerLevel: number = -1
    public battleRoyalData = new ApexUserBattleRoyalData("", "", -1, -1)
    public arenaData = new ApexUserArenaData("", "", -1, -1)

    constructor(
        playerName: string,
        playerLevel: number,
        battleRoyalData: ApexUserBattleRoyalData,
        arenaData: ApexUserArenaData
    ) {
        this.playerName = playerName
        this.playerLevel = playerLevel
        this.battleRoyalData = battleRoyalData
        this.arenaData = arenaData
    }
}