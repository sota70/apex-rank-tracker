import { Guild, Role } from "discord.js";

export class GuildRoleLoader {

    protected guild: Guild

    constructor(guild: Guild) {
        this.guild = guild
    }

    public fetchRoleFromName(name: string): Role | undefined {
        return this.guild.roles.cache.find(role => role.name === name)
    }
}