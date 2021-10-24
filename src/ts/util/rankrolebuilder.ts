import { Guild, Role } from "discord.js"

export class RankRoleBuilder {

    private rankName: string
    private guild: Guild

    constructor(rankName: string, guild: Guild) {
        this.rankName = rankName
        this.guild = guild
    }

    public build(): Role {
        let role = this.guild.roles.cache.find(role => role.name === this.rankName)
        if (role === undefined) throw Error(`Guild must have a ${this.rankName} role`)
        return role
    }

    public buildPredatorRole(): Role {
        let predatorRole = this.guild.roles.cache.find(role => role.name === "Predator")
        if (predatorRole === undefined) throw Error("Guild must have a predator role")
        return predatorRole
    }
}