"use strict";
// import * as request from 'request'
// import * as discord from 'discord.js'
// import { ApexUserData } from './apexuserdata'
// export class PlayerDataLoader {
//     public async obtainPlayerData(username: string, platform: string): Promise<ApexUserData> {
//         let apexUserData = new ApexUserData("None", 0, "None", "None", -1, -1)
//         let url = `https://public-api.tracker.gg/apex/v1/standard/profile/${this.checkPlatform(platform)}/${username}`
//         request.get({
//             url: url,
//             headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
//         }, (err, res, body) => {
//             let jsonData = JSON.parse(body)
//             if (jsonData.data === undefined) return apexUserData
//             let playerName = jsonData.data.metadata.platformUserHandle
//             let playerLevel = jsonData.data.metadata.level
//             let playerRank = jsonData.data.metadata.rankName
//             let playerRankImage = jsonData.data.metadata.rankImage
//             let playerRankRP = this.getPlayerRP(jsonData.data.stats)
//             let playerRanking = this.getPlayerRanking(jsonData.data.stats)
//             apexUserData = new ApexUserData(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking)
//         })
//         await this.delay(1)
//         return apexUserData
//     }
//     public setPlayerRankRole(
//         discordUser: discord.GuildMember,
//         username: string,
//         platform: string,
//         guild: discord.Guild
//     ) {
//         let url = `https://public-api.tracker.gg/apex/v1/standard/profile/${this.checkPlatform(platform)}/${username}`
//         request.get({
//             url: url,
//             headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
//         }, (err, res, body) => {
//             let jsonData = JSON.parse(body)
//             if (jsonData.data === undefined) {
//                 console.log('Successed with avoding the error')
//                 return
//             }
//             let playerRank = jsonData.data.metadata.rankName
//             let playerRanking = this.getPlayerRanking(jsonData.data.stats)
//             this.setPlayerRole(discordUser, playerRank, playerRanking, guild)
//         })
//     }
//     private delay(sec: number) {
//         return new Promise((resolve) => {
//             setTimeout(resolve, sec * 1000)
//         })
//     }
//     private async setPlayerRole(
//         discordUser: discord.GuildMember,
//         rankName: string,
//         ranking: number,
//         guild: discord.Guild
//     ) {
//         let role
//         let awaitedDiscordUser = await discordUser
//         if (this.isPlayerRankPredator(ranking)) {
//             role = guild.roles.cache.find(r => r.name === "Predator")
//             this.resetPlayerRankRole(discordUser, guild)
//             discordUser.roles.add(role!)
//             return
//         }
//         switch (rankName) {
//             case "Gold 4":
//                 role = guild.roles.cache.find(r => r.name === "Gold 4")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Gold 3":
//                 role = guild.roles.cache.find(r => r.name === "Gold 3")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Gold 2":
//                 role = guild.roles.cache.find(r => r.name === "Gold 2")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Gold 1":
//                 role = guild.roles.cache.find(r => r.name === "Gold 1")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Platinum 4":
//                 role = guild.roles.cache.find(r => r.name === "Platinum 4")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Platinum 3":
//                 role = guild.roles.cache.find(r => r.name === "Platinum 3")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Platinum 2":
//                 role = guild.roles.cache.find(r => r.name === "Platinum 2")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Platinum 1":
//                 role = guild.roles.cache.find(r => r.name === "Platinum 1")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Diamond 4":
//                 role = guild.roles.cache.find(r => r.name === "Diamond 4")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Diamond 3":
//                 role = guild.roles.cache.find(r => r.name === "Diamond 3")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Diamond 2":
//                 role = guild.roles.cache.find(r => r.name === "Diamond 2")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Diamond 1":
//                 role = guild.roles.cache.find(r => r.name === "Diamond 1")
//                 this.resetPlayerRankRole(awaitedDiscordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             case "Master":
//                 role = guild.roles.cache.find(r => r.name === "Master")
//                 this.resetPlayerRankRole(discordUser, guild)
//                 await discordUser.roles.add(role!).catch(console.error)
//                 break
//             default:
//                 break
//         }
//     }
//     private async resetPlayerRankRole(discordUser: discord.GuildMember, guild: discord.Guild) {
//         let rankRoles = [
//             guild.roles.cache.find(r => r.name === "Gold 4"),
//             guild.roles.cache.find(r => r.name === "Gold 3"),
//             guild.roles.cache.find(r => r.name === "Gold 2"),
//             guild.roles.cache.find(r => r.name === "Gold 1"),
//             guild.roles.cache.find(r => r.name === "Platinum 4"),
//             guild.roles.cache.find(r => r.name === "Platinum 3"),
//             guild.roles.cache.find(r => r.name === "Platinum 2"),
//             guild.roles.cache.find(r => r.name === "Platinum 1"),
//             guild.roles.cache.find(r => r.name === "Diamond 4"),
//             guild.roles.cache.find(r => r.name === "Diamond 3"),
//             guild.roles.cache.find(r => r.name === "Diamond 2"),
//             guild.roles.cache.find(r => r.name === "Diamond 1"),
//             guild.roles.cache.find(r => r.name === "Master"),
//             guild.roles.cache.find(r => r.name === "Predator")
//         ]
//         for (let i = 0; i < rankRoles.length; i++) {
//             if (!discordUser.roles.cache.has(rankRoles[i]?.id!)) continue
//             await discordUser.roles.remove(rankRoles[i]!)
//         }
//     }
//     private checkPlatform(platform: string): number {
//         switch (platform) {
//             case "pc": return 5
//             case "ps4": return 2
//             case "xbox": return 1
//             default: return 0
//         }
//     }
//     private getPlayerRP(playerStatistics: Array<any>): any {
//         for (let i = 0; i < playerStatistics.length; i++) {
//             if (playerStatistics[i].metadata.key !== "RankScore") continue
//             return playerStatistics[i].value
//         }
//     }
//     private getPlayerRanking(playerStatistics: Array<any>): any {
//         for (let i = 0; i < playerStatistics.length; i++) {
//             if (playerStatistics[i].metadata.key !== "RankScore") continue
//             return playerStatistics[i].rank
//         }
//     }
//     private isPlayerRankPredator(playerRanking: number): Boolean {
//         return playerRanking <= 750
//     }
// }
