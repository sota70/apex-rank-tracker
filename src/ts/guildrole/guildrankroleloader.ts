import { Guild, Role } from "discord.js";
import { GuildRoleLoader } from "./guildroleloader";
import { ARENA_RANK_ROLE_NAMES, BATTLE_ROYAL_RANK_ROLE_NAMES } from "./rankroles";

export class GuildRankRoleLoader extends GuildRoleLoader {

    constructor(guild: Guild) {
        super(guild)
    }

    public fetchApexBattleRoyalRankRoles(): Array<Role | undefined> {
        let roles: Array<Role | undefined> = []
        BATTLE_ROYAL_RANK_ROLE_NAMES.forEach(value => {
            let role = this.guild.roles.cache.find(r => r.name === value)
            roles.push(role)
        })
        return roles
    }

    public fetchApexArenaRankRoles(): Array<Role | undefined> {
        let roles: Array<Role | undefined> = []
        ARENA_RANK_ROLE_NAMES.forEach(value => {
            let role = this.guild.roles.cache.find(r => r.name === value)
            roles.push(role)
        })
        return roles
    }

    public fetchApexBattleRoyalRankRoleFromName(rankName: string): Role | undefined {
        let roleName = BATTLE_ROYAL_RANK_ROLE_NAMES.get(rankName)
        if (roleName === undefined) return undefined
        return this.fetchRoleFromName(roleName)
    }

    public fetchApexArenaRankRoleFromName(rankName: string): Role | undefined {
        let roleName = ARENA_RANK_ROLE_NAMES.get(rankName)
        if (roleName === undefined) return undefined
        return this.fetchRoleFromName(roleName)
    }
}