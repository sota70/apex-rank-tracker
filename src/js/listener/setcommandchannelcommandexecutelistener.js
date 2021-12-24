"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCommandChannelCommandExecuteListener = void 0;
var commandchannelwriter_1 = require("../commandchannel/commandchannelwriter");
/**
 * ディスコードのサーバーのコマンドチャンネルを指定するコマンドが呼び出されたときの処理をするリスナークラス
 */
var SetCommandChannelCommandExecuteListener = /** @class */ (function () {
    function SetCommandChannelCommandExecuteListener() {
    }
    /**
     * ディスコードのサーバーのコマンドチャンネルを指定するコマンドが呼び出されたときの処理をするメソッド
     * * そのディスコードサーバーのIDとコマンドチャンネルに指定したチャンネルIDをセットでデータベースに保存する
     *
     * @param event コマンド呼び出しを検知するイベント
     */
    SetCommandChannelCommandExecuteListener.prototype.handle = function (event) {
        if (event.commandName !== 'setcommandchannel' && event.commandName !== 'scc')
            return;
        var _a = event.interaction, options = _a.options, guild = _a.guild;
        var commandChannelName = options.getString('channel');
        var newCommandChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.find(function (ch) { return ch.name === commandChannelName; });
        if (newCommandChannel === undefined) {
            event.interaction.reply({ ephemeral: true, content: "Couldn't find the channel" });
            return;
        }
        new commandchannelwriter_1.CommandChannelSetter(guild === null || guild === void 0 ? void 0 : guild.id, newCommandChannel === null || newCommandChannel === void 0 ? void 0 : newCommandChannel.id).setCommandChannel();
        event.interaction.reply({
            ephemeral: true,
            content: "The command channel has been set to " + newCommandChannel.name
        });
    };
    return SetCommandChannelCommandExecuteListener;
}());
exports.SetCommandChannelCommandExecuteListener = SetCommandChannelCommandExecuteListener;
