import { UserInfoReader } from './userinforeader'
import * as sqlDataEditor from '../sqldataeditor'

export class UserInfoWriter {

    private discordUserId: string
    private username: string
    private platform: string
    private guildId: string
    private userInfoReader: UserInfoReader

    constructor(
        discordUserId: string,
        username: string,
        platform: string,
        guildId: string
    ) {
        this.discordUserId = discordUserId
        this.username = username
        this.platform = platform
        this.guildId = guildId
        this.userInfoReader = new UserInfoReader(discordUserId, guildId)
    }

    public async writeData() {
        let data = new Map<string, any>([
            ["discordUserId", this.discordUserId],
            ["username", this.username],
            ["platform", this.platform],
            ["guildId", this.guildId]
        ])
        let conditions = new Map<string, any>([
            ["discordUserId", this.discordUserId],
            ["guildId", this.guildId]
        ])
        if (!await this.userInfoReader.isDataExists()) {
            sqlDataEditor.insert("username", data)
            return
        }
        sqlDataEditor.update("username", data, conditions)
    }
}