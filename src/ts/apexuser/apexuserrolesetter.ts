import { Guild, GuildMember } from "discord.js"
import request from "request"
import { ApexUserDataLoader } from "./apexuserdatareader"

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

    private async setPlayerRole(rankName: string, ranking: number) {
        let role
        let isPlayerRankPredator = ranking <= 750
        if (isPlayerRankPredator) {
            role = this.guild.roles.cache.find(r => r.name === "Predator")
            this.resetPlayerRankRole()
            this.discordUser.roles.add(role!)
            return
        }
        switch (rankName) {
            case "Gold 4":
                role = this.guild.roles.cache.find(r => r.name === "Gold 4")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Gold 3":
                role = this.guild.roles.cache.find(r => r.name === "Gold 3")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Gold 2":
                role = this.guild.roles.cache.find(r => r.name === "Gold 2")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Gold 1":
                role = this.guild.roles.cache.find(r => r.name === "Gold 1")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Platinum 4":
                role = this.guild.roles.cache.find(r => r.name === "Platinum 4")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Platinum 3":
                role = this.guild.roles.cache.find(r => r.name === "Platinum 3")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Platinum 2":
                role = this.guild.roles.cache.find(r => r.name === "Platinum 2")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Platinum 1":
                role = this.guild.roles.cache.find(r => r.name === "Platinum 1")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Diamond 4":
                role = this.guild.roles.cache.find(r => r.name === "Diamond 4")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Diamond 3":
                role = this.guild.roles.cache.find(r => r.name === "Diamond 3")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Diamond 2":
                role = this.guild.roles.cache.find(r => r.name === "Diamond 2")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Diamond 1":
                role = this.guild.roles.cache.find(r => r.name === "Diamond 1")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            case "Master":
                role = this.guild.roles.cache.find(r => r.name === "Master")
                this.resetPlayerRankRole()
                await this.discordUser.roles.add(role!).catch(console.error)
                break
            default:
                break
        }
    }

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

    private checkPlatform(): number {
        switch (this.platform) {
            case "pc": return 5
            case "ps4": return 2
            case "xbox": return 1
            default: return 0
        }
    }
}