import { Guild, GuildMember } from "discord.js"
import request from "request"
import { RankRoleBuilder } from "../util/rankrolebuilder"
import { ApexUserDataLoader } from "./apexuserdatareader"

/**
 * ディスコードユーザーがセットしたapexユーザーのランクに適応したロールを付与するクラス
 * 
 * @property {@link discordUser} ディスコードユーザー
 * @property {@link username} apexプレイヤー名
 * @property {@link platform} apexプレイヤーのプラットフォーム
 * @property {@link guild} ディスコードサーバー
 */
export class ApexUserRoleSetter {

    private discordUser: GuildMember
    private username: string
    private platform: string
    private guild: Guild

    constructor(
        discordUser: GuildMember,
        username: string,
        platform: string,
        guild: Guild
    ) {
        this.discordUser = discordUser
        this.username = username
        this.platform = platform
        this.guild = guild
    }

    /**
     * ディスコードユーザーがセットしたapexユーザーのランクに適応したロールを付与するメソッド
     * このランクロールは5分毎に更新される
     * * ディスコードユーザーはあらかじめapexユーザーをセットしておく必要がある
     */
    public setPlayerRankRole() {
        let url = `https://public-api.tracker.gg/apex/v1/standard/profile/${this.checkPlatform()}/${this.username}`
        request.get({
            url: url,
            headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
        }, (err, res, body) => {
            let jsonData = JSON.parse(body)
            if (jsonData.data === undefined) return
            let apexUserDataLoader = new ApexUserDataLoader(this.username, this.platform)
            let playerRank = jsonData.data.metadata.rankName
            let playerRanking = apexUserDataLoader.getPlayerRanking(jsonData.data.stats)
            this.setPlayerRole(playerRank, playerRanking)
        })
    }

    // ディスコードユーザーがセットしたapexユーザーのランクに適応したロールを付与するメソッド
    private async setPlayerRole(rankName: string, ranking: number) {
        let role
        let isPlayerRankPredator = ranking <= 750
        let rankRoleBuilder = new RankRoleBuilder(rankName, this.guild)
        if (isPlayerRankPredator) {
            role = rankRoleBuilder.buildPredatorRole()
            this.resetPlayerRankRole()
            this.discordUser.roles.add(role)
            return
        }
        role = rankRoleBuilder.build()
        this.resetPlayerRankRole()
        this.discordUser.roles.add(role)
    }

    // ディスコードユーザーのランクをリセットするメソッド
    private async resetPlayerRankRole() {
        let rankRoles = [
            this.guild.roles.cache.find(r => r.name === "Gold 4"),
            this.guild.roles.cache.find(r => r.name === "Gold 3"),
            this.guild.roles.cache.find(r => r.name === "Gold 2"),
            this.guild.roles.cache.find(r => r.name === "Gold 1"),
            this.guild.roles.cache.find(r => r.name === "Platinum 4"),
            this.guild.roles.cache.find(r => r.name === "Platinum 3"),
            this.guild.roles.cache.find(r => r.name === "Platinum 2"),
            this.guild.roles.cache.find(r => r.name === "Platinum 1"),
            this.guild.roles.cache.find(r => r.name === "Diamond 4"),
            this.guild.roles.cache.find(r => r.name === "Diamond 3"),
            this.guild.roles.cache.find(r => r.name === "Diamond 2"),
            this.guild.roles.cache.find(r => r.name === "Diamond 1"),
            this.guild.roles.cache.find(r => r.name === "Master"),
            this.guild.roles.cache.find(r => r.name === "Predator")
        ]
        for (let i = 0; i < rankRoles.length; i++) {
            if (!this.discordUser.roles.cache.has(rankRoles[i]?.id!)) continue
            await this.discordUser.roles.remove(rankRoles[i]!)
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
}