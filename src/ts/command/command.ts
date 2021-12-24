import { SlashCommandBuilder } from "@discordjs/builders"
import { commandNames } from './commandname'

/**
 * apexプレイヤーのステータスを表示するスラッシュコマンド
 * 第１引数に検索したいプレイヤーの名前
 * 第２引数に検索したいプレイヤーのプラットフォームを入力する
 */
export const showApexStatusCommand = new SlashCommandBuilder()
    .setName(commandNames.SHOWAPEXSTATUS)
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

/**
 * apexプレイヤーのステータスを表示するスラッシュコマンド（コマンド名省略版）
 * 第１引数に検索したいプレイヤーの名前
 * 第２引数に検索したいプレイヤーのプラットフォームを入力する
 */
export const showApexStatusAliaseCommand = new SlashCommandBuilder()
    .setName(commandNames.SHOWAPEXSTATUSALIASE)
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

/**
 * コマンド専用チャンネルをセットするスラッシュコマンド
 * 第1引数にコマンド専用チャンネルにしたいチャンネルの名前を入力する
 */
export const setCommandChannelCommand = new SlashCommandBuilder()
    .setName(commandNames.SETCOMMANDCHANNEL)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("channel")
            .setDescription("Channel name you want to set")
            .setRequired(true)
    )

/**
 * コマンド専用チャンネルをセットするスラッシュコマンド（コマンド名省略版）
 * 第1引数にコマンド専用チャンネルにしたいチャンネルの名前を入力する
 */
export const setCommandChannelAliaseCommand = new SlashCommandBuilder()
    .setName(commandNames.SETCOMMANDCHANNELALIASE)
    .setDescription("Set command channel in the server")
    .setDefaultPermission(true)
    .addStringOption(option =>
        option.setName("channel")
            .setDescription("Channel name you want to set")
            .setRequired(true)
    )

/**
 * ディスコードユーザーにapexプレイヤー名をセットするスラッシュコマンド
 * 第1引数にセットしたいプレイヤー名
 * 第2引数にセットしたいプレイヤー名のプラットフォームを入力する
 */    
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

/**
 * ディスコードユーザーにapexプレイヤー名をセットするスラッシュコマンド（コマンド名省略版）
 * 第1引数にセットしたいプレイヤー名
 * 第2引数にセットしたいプレイヤー名のプラットフォームを入力する
 */
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