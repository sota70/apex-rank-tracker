import { Guild, Role } from "discord.js"

/**
 * rankNameからランクロールを見つけて、返すクラス
 * 
 * @property {@link rankName} ランク名
 * @property {@link guild} ディスコードサーバー
 */
export class RankRoleBuilder {

    private rankName: string
    private guild: Guild

    /**
     * {@link rankName}と{@link guild}をセットする
     * 
     * @param rankName ランク名
     * @param guild ディスコードサーバー
     */
    constructor(rankName: string, guild: Guild) {
        this.rankName = rankName
        this.guild = guild
    }

    /**
     * ディスコードサーバーにある{@link rankName}と対応するロールがあった場合、そのロールを返すメソッド
     * * サーバーにランク名と合うロールが無い場合はエラーになる
     * 
     * @returns {@link rankName}と対応するロールを返す
     */
    public build(): Role {
        let role = this.guild.roles.cache.find(role => role.name === this.rankName)
        if (role === undefined) throw Error(`Guild must have a ${this.rankName} role`)
        return role
    }

    /**
     * ディスコードサーバーにあるプレデータロールを探して、返すメソッド
     * * ディスコードサーバーにプレデターロールが無い場合、エラーになる
     * 
     * @returns プレデターロールを返す
     */
    public buildPredatorRole(): Role {
        let predatorRole = this.guild.roles.cache.find(role => role.name === "Predator")
        if (predatorRole === undefined) throw Error("Guild must have a predator role")
        return predatorRole
    }
}