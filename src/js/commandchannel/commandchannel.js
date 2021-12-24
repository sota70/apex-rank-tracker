"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandChannel = void 0;
/**
 * ディスコードサーバーのコマンド専用チャンネルの情報を保存しておく用のデータクラス
 *
 * @property {@link serverId} ディスコードサーバーのID
 * @property {@link channelId} コマンド専用チャンネルのID
 */
var CommandChannel = /** @class */ (function () {
    function CommandChannel(serverId, channelId) {
        this.channelId = "None";
        this.serverId = serverId;
        this.channelId = channelId;
    }
    return CommandChannel;
}());
exports.CommandChannel = CommandChannel;
