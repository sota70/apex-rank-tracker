import { ApplicationCommandData, Constants } from 'discord.js'

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

export const apexCommand: ApplicationCommandData = {
    name: commandNames.APEX,
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
}

export const apexAliaseCommand: ApplicationCommandData = {
    name: commandNames.APEXALIASE,
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
}

export const setCommandChannelCommand: ApplicationCommandData = {
    name: commandNames.SETCOMMANDCHANNEL,
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
}

export const setCommandChannelAliaseCommand: ApplicationCommandData = {
    name: commandNames.SETCOMMANDCHANNELALIASE,
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
}

export const timerstartCommand: ApplicationCommandData = {
    name: commandNames.TIMERSTART,
    description: "Start rank update timer",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: []
}

export const timerstartAliaseCommand: ApplicationCommandData = {
    name: commandNames.TIMERSTARTALIASE,
    description: "Start rank update timer",
    type: "CHAT_INPUT",
    defaultPermission: true,
    options: []
}

export const setUsernameCommand: ApplicationCommandData = {
    name: commandNames.SETUSERNAME,
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
}

export const setUsernameAliaseCommand: ApplicationCommandData = {
    name: commandNames.SETUSERNAMEALIASE,
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
}