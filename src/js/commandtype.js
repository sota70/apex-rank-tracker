"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUsernameAliaseCommand = exports.setUsernameCommand = exports.setCommandChannelAliaseCommand = exports.setCommandChannelCommand = exports.apexAliaseCommand = exports.apexCommand = exports.commandNames = void 0;
var builders_1 = require("@discordjs/builders");
var discord_js_1 = require("discord.js");
var commandTypes = discord_js_1.Constants.ApplicationCommandOptionTypes;
exports.commandNames = {
    APEX: "apex",
    APEXALIASE: "a",
    SETCOMMANDCHANNEL: "setcommandchannel",
    SETCOMMANDCHANNELALIASE: "scc",
    TIMERSTART: "timerstart",
    TIMERSTARTALIASE: "ts",
    SETUSERNAME: "setusername",
    SETUSERNAMEALIASE: "sun"
};
exports.apexCommand = new builders_1.SlashCommandBuilder()
    .setName(exports.commandNames.APEX)
    .setDescription("Print specific player's data in apex")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("username")
        .setDescription("Apex username you're using")
        .setRequired(true);
})
    .addStringOption(function (option) {
    return option.setName("platform")
        .setDescription("Platform your account is on")
        .setRequired(true);
});
exports.apexAliaseCommand = new builders_1.SlashCommandBuilder()
    .setName(exports.commandNames.APEXALIASE)
    .setDescription("Print specific player's data in apex")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("username")
        .setDescription("Apex username you're using")
        .setRequired(true);
})
    .addStringOption(function (option) {
    return option.setName("platform")
        .setDescription("Platform your account is on")
        .setRequired(true);
});
exports.setCommandChannelCommand = new builders_1.SlashCommandBuilder()
    .setName(exports.commandNames.SETCOMMANDCHANNEL)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("channel")
        .setDescription("Channel name you want to set")
        .setRequired(true);
});
exports.setCommandChannelAliaseCommand = new builders_1.SlashCommandBuilder()
    .setName(exports.commandNames.SETCOMMANDCHANNELALIASE)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("channel")
        .setDescription("Channel name you want to set")
        .setRequired(true);
});
exports.setUsernameCommand = new builders_1.SlashCommandBuilder()
    .setName(exports.commandNames.SETUSERNAME)
    .setDescription("Set username that is used for rank update")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("username")
        .setDescription("Apex username you're using")
        .setRequired(true);
})
    .addStringOption(function (option) {
    return option.setName("platform")
        .setDescription("Platform your account is on")
        .setRequired(true);
});
exports.setUsernameAliaseCommand = new builders_1.SlashCommandBuilder()
    .setName(exports.commandNames.SETUSERNAMEALIASE)
    .setDescription("Set username that is used for rank update")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("username")
        .setDescription("Apex username you're using")
        .setRequired(true);
})
    .addStringOption(function (option) {
    return option.setName("platform")
        .setDescription("Platform your account is on")
        .setRequired(true);
});
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
