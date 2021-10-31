import { Client } from "discord.js";
import { ApexUserRoleSetter } from "../apexuser/apexuserrolesetter";
import { ServerReceivePostEvent } from "../event/serverreceivepostevent";
import { UserInfoReader } from "../userinfo/userinforeader";
import { EventListener } from "./eventlistener";

export class ServerReceiveUpdateRankPostListener implements EventListener {

    public async handle(event: ServerReceivePostEvent) {
        const { res, client, methodType } = event
        if (methodType !== 'update_rank') {
            res.end()
            return
        }
        console.log(`post: ${methodType}`)
        console.log(`Updated player's rank`)
        await this.setDiscordUsersRole(client)
    }

    private async setDiscordUsersRole(client: Client) {
        (await UserInfoReader.getPlayerDatas()).forEach(async function (data) {
            let guild = await client.guilds.fetch(data.guildId)
            let discordUser = await guild.members.fetch(data.discordUserId)
            let username = data.username
            let platform = data.platform
            let apexUserRoleSetter = new ApexUserRoleSetter(discordUser, username, platform, guild)
            apexUserRoleSetter.setPlayerRankRole()
        })
    }
}