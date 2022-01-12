import { Guild, GuildMember } from "discord.js"
import request from "request"
import { GuildRoleLoader } from "../guildrole/guildroleloader"
import { GuildRankRoleLoader } from "../guildrole/guildrankroleloader"
import { ARENA_RANK_ROLE_NAMES, BATTLE_ROYAL_RANK_ROLE_NAMES } from "../guildrole/rankroles"
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
    public async setPlayerRankRole() {
        let apexUserData = await new ApexUserDataLoader(this.username, this.platform).getPlayerData()
        let battleRoyalRankName = apexUserData.battleRoyalData.rank
        let arenaRankName = apexUserData.arenaData.rank
        let guildRankRoleLoader = new GuildRankRoleLoader(this.guild)
        let battleRoyalRankRole = guildRankRoleLoader.fetchApexBattleRoyalRankRoleFromName(battleRoyalRankName)
        let arenaRankRole = guildRankRoleLoader.fetchApexArenaRankRoleFromName(arenaRankName)
        if (battleRoyalRankRole === undefined || arenaRankRole === undefined) return
        this.resetPlayerRankRole()
        this.discordUser.roles.add(battleRoyalRankRole)
        this.discordUser.roles.add(arenaRankRole)
    }

    // ディスコードユーザーのランクをリセットするメソッド
    private async resetPlayerRankRole() {
        let guildRoleLoader = new GuildRoleLoader(this.guild)
        BATTLE_ROYAL_RANK_ROLE_NAMES.forEach(async rankName => {
            let rankRole = guildRoleLoader.fetchRoleFromName(rankName)
            if (rankRole === undefined) return
            if (!this.discordUser.roles.cache.has(rankRole.id)) return
            await this.discordUser.roles.remove(rankRole)
        })
        ARENA_RANK_ROLE_NAMES.forEach(async rankName => {
            let rankRole = guildRoleLoader.fetchRoleFromName(rankName)
            if (rankRole === undefined) return
            if (!this.discordUser.roles.cache.has(rankRole.id)) return
            await this.discordUser.roles.remove(rankRole)
        })
    }
}