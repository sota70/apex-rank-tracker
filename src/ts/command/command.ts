import { SlashCommandBuilder } from "@discordjs/builders"
import { commandNames } from './commandname'

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