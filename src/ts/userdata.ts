export class User {

    public discordUserId: string
    public username: string
    public platform: string

    constructor(discordUserId: string, username: string, platform: string) {
        this.discordUserId = discordUserId
        this.username = username
        this.platform = platform
    }
}