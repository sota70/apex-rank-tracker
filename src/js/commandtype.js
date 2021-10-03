"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUsernameAliaseCommand = exports.setUsernameCommand = exports.timerstartAliaseCommand = exports.timerstartCommand = exports.setCommandChannelAliaseCommand = exports.setCommandChannelCommand = exports.apexAliaseCommand = exports.apexCommand = exports.commandNames = void 0;
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
exports.apexCommand = {
    name: exports.commandNames.APEX,
    description: "Print specific player's data in apex",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: [
        {
            name: "username",
            description: "Apex username you're using",
            required: true,
            type: commandTypes.STRING
        },
        {
            name: "platform",
            description: "Platform your account is on",
            required: true,
            type: commandTypes.STRING
        }
    ]
};
exports.apexAliaseCommand = {
    name: exports.commandNames.APEXALIASE,
    description: "Print specific player's data in apex",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: [
        {
            name: "username",
            description: "Apex username you're using",
            required: true,
            type: commandTypes.STRING
        },
        {
            name: "platform",
            description: "Platform your account is on",
            required: true,
            type: commandTypes.STRING
        }
    ]
};
exports.setCommandChannelCommand = {
    name: exports.commandNames.SETCOMMANDCHANNEL,
    description: "Set command channel in the server",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: [
        {
            name: "channel",
            description: "Channel name you want to set",
            required: true,
            type: commandTypes.STRING
        }
    ]
};
exports.setCommandChannelAliaseCommand = {
    name: exports.commandNames.SETCOMMANDCHANNELALIASE,
    description: "Set command channel in the server",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: [
        {
            name: "channel",
            description: "Channel name you want to set",
            required: true,
            type: commandTypes.STRING
        }
    ]
};
exports.timerstartCommand = {
    name: exports.commandNames.TIMERSTART,
    description: "Start rank update timer",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: []
};
exports.timerstartAliaseCommand = {
    name: exports.commandNames.TIMERSTARTALIASE,
    description: "Start rank update timer",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: []
};
exports.setUsernameCommand = {
    name: exports.commandNames.SETUSERNAME,
    description: "Set username that is used for rank update",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: [
        {
            name: "username",
            description: "Apex username you're using",
            required: true,
            type: commandTypes.STRING
        },
        {
            name: "platform",
            description: "Platform your account is on",
            required: true,
            type: commandTypes.STRING
        }
    ]
};
exports.setUsernameAliaseCommand = {
    name: exports.commandNames.SETUSERNAMEALIASE,
    description: "Set username that is used for rank update",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: [
        {
            name: "username",
            description: "Apex username you're using",
            required: true,
            type: commandTypes.STRING
        },
        {
            name: "platform",
            description: "Platform your account is on",
            required: true,
            type: commandTypes.STRING
        }
    ]
};
