"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUsernameAliaseCommand = exports.setUsernameCommand = exports.setCommandChannelAliaseCommand = exports.setCommandChannelCommand = exports.showApexStatusAliaseCommand = exports.showApexStatusCommand = void 0;
var builders_1 = require("@discordjs/builders");
var commandname_1 = require("./commandname");
exports.showApexStatusCommand = new builders_1.SlashCommandBuilder()
    .setName(commandname_1.commandNames.SHOWAPEXSTATUS)
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
exports.showApexStatusAliaseCommand = new builders_1.SlashCommandBuilder()
    .setName(commandname_1.commandNames.SHOWAPEXSTATUSALIASE)
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
    .setName(commandname_1.commandNames.SETCOMMANDCHANNEL)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("channel")
        .setDescription("Channel name you want to set")
        .setRequired(true);
});
exports.setCommandChannelAliaseCommand = new builders_1.SlashCommandBuilder()
    .setName(commandname_1.commandNames.SETCOMMANDCHANNELALIASE)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(function (option) {
    return option.setName("channel")
        .setDescription("Channel name you want to set")
        .setRequired(true);
});
exports.setUsernameCommand = new builders_1.SlashCommandBuilder()
    .setName(commandname_1.commandNames.SETUSERNAME)
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
    .setName(commandname_1.commandNames.SETUSERNAMEALIASE)
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
