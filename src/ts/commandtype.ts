import { SlashCommandBuilder } from '@discordjs/builders'
import { Constants } from 'discord.js'

const commandTypes = Constants.ApplicationCommandOptionTypes

export const commandNames = {
    APEX: "apex",
    APEXALIASE: "a",
    SETCOMMANDCHANNEL: "setcommandchannel",
    SETCOMMANDCHANNELALIASE: "scc",
    TIMERSTART: "timerstart",
    TIMERSTARTALIASE: "ts",
    SETUSERNAME: "setusername",
    SETUSERNAMEALIASE: "sun"
}

export const apexCommand = new SlashCommandBuilder()
    .setName(commandNames.APEX)
    .setDescription("Print specific player's data in apex")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("username")
            .setDescription("Apex username you're using")
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("platform")
            .setDescription("Platform your account is on")
            .setRequired(true)
    )

export const apexAliaseCommand = new SlashCommandBuilder()
    .setName(commandNames.APEXALIASE)
    .setDescription("Print specific player's data in apex")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("username")
            .setDescription("Apex username you're using")
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("platform")
            .setDescription("Platform your account is on")
            .setRequired(true)
    )

export const setCommandChannelCommand = new SlashCommandBuilder()
    .setName(commandNames.SETCOMMANDCHANNEL)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("channel")
            .setDescription("Channel name you want to set")
            .setRequired(true)
    )

export const setCommandChannelAliaseCommand = new SlashCommandBuilder()
    .setName(commandNames.SETCOMMANDCHANNELALIASE)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("channel")
            .setDescription("Channel name you want to set")
            .setRequired(true)
    )

export const setUsernameCommand = new SlashCommandBuilder()
    .setName(commandNames.SETUSERNAME)
    .setDescription("Set username that is used for rank update")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("username")
            .setDescription("Apex username you're using")
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("platform")
            .setDescription("Platform your account is on")
            .setRequired(true)
    )

export const setUsernameAliaseCommand = new SlashCommandBuilder()
    .setName(commandNames.SETUSERNAMEALIASE)
    .setDescription("Set username that is used for rank update")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("username")
            .setDescription("Apex username you're using")
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("platform")
            .setDescription("Platform your account is on")
            .setRequired(true)
    )

// export const apexCommand: ApplicationCommandData = {
//     name: commandNames.APEX,
//     description: "Print specific player's data in apex",
//     type: "CHAT_INPUT",
//     defaultPermission: true,
//     options: [
//         {
//             name: "username",
//             description: "Apex username you're using",
//             required: true,
//             type: commandTypes.STRING
//         },
//         {
//             name: "platform",
//             description: "Platform your account is on",
//             required: true,
//             type: commandTypes.STRING
//         }
//     ]
// }

// export const apexAliaseCommand: ApplicationCommandData = {
//     name: commandNames.APEXALIASE,
//     description: "Print specific player's data in apex",
//     type: "CHAT_INPUT",
//     defaultPermission: true,
//     options: [
//         {
//             name: "username",
//             description: "Apex username you're using",
//             required: true,
//             type: commandTypes.STRING
//         },
//         {
//             name: "platform",
//             description: "Platform your account is on",
//             required: true,
//             type: commandTypes.STRING
//         }
//     ]
// }

// export const setCommandChannelCommand: ApplicationCommandData = {
//         name: commandNames.SETCOMMANDCHANNEL,
//         description: "Set command channel in the server",
//         type: "CHAT_INPUT",
//         defaultPermission: true,
//         options: [
//             {
//                 name: "channel",
//                 description: "Channel name you want to set",
//                 required: true,
//                 type: commandTypes.STRING
//             }
//         ]
//     }

// export const setCommandChannelAliaseCommand: ApplicationCommandData = {
//     name: commandNames.SETCOMMANDCHANNELALIASE,
//     description: "Set command channel in the server",
//     type: "CHAT_INPUT",
//     defaultPermission: true,
//     options: [
//         {
//             name: "channel",
//             description: "Channel name you want to set",
//             required: true,
//             type: commandTypes.STRING
//         }
//     ]
// }

// export const setUsernameCommand: ApplicationCommandData = {
//     name: commandNames.SETUSERNAME,
//     description: "Set username that is used for rank update",
//     type: "CHAT_INPUT",
//     defaultPermission: true,
//     options: [
//         {
//             name: "username",
//             description: "Apex username you're using",
//             required: true,
//             type: commandTypes.STRING
//         },
//         {
//             name: "platform",
//             description: "Platform your account is on",
//             required: true,
//             type: commandTypes.STRING
//         }
//     ]
// }

// export const setUsernameAliaseCommand: ApplicationCommandData = {
//     name: commandNames.SETUSERNAMEALIASE,
//     description: "Set username that is used for rank update",
//     type: "CHAT_INPUT",
//     defaultPermission: true,
//     options: [
//         {
//             name: "username",
//             description: "Apex username you're using",
//             required: true,
//             type: commandTypes.STRING
//         },
//         {
//             name: "platform",
//             description: "Platform your account is on",
//             required: true,
//             type: commandTypes.STRING
//         }
//     ]
// }
