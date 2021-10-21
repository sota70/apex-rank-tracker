export class UserInfo {

    public discordUserId: string
    public username: string
    public platform: string
    public guildId: string

    constructor(discordUserId: string, username: string, platform: string, guildId: string) {
        this.discordUserId = discordUserId
        this.username = username
        this.platform = platform
        this.guildId = guildId
    }
}