"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUsernameCommandExecuteListener = void 0;
var userinfowriter_1 = require("../userinfo/userinfowriter");
/**
 * ユーザー名を設定するコマンドが呼び出されたときの処理をするリスナークラス
 */
var SetUsernameCommandExecuteListener = /** @class */ (function () {
    function SetUsernameCommandExecuteListener() {
    }
    /**
     * ユーザー名を設定するコマンドが呼び出されたときの処理をするメソッド
     * * ユーザー名とプラットフォームをコマンドを実行したディスコードユーザーIDと一緒にデータベースに保存する
     *
     * @param event コマンド呼び出しを検知するイベント
     */
    SetUsernameCommandExecuteListener.prototype.handle = function (event) {
        if (event.commandName !== 'setusername' && event.commandName !== 'sun')
            return;
        var _a = event.interaction, options = _a.options, user = _a.user, guildId = _a.guildId;
        var username = options.getString('username', true);
        var platform = options.getString('platform', true);
        var userInfoWriter = new userinfowriter_1.UserInfoWriter(user.id, username, platform, guildId);
        userInfoWriter.writeData();
        event.interaction.reply({
            ephemeral: true,
            content: "Set username to " + username + " and set platform to " + platform
        });
    };
    return SetUsernameCommandExecuteListener;
}());
exports.SetUsernameCommandExecuteListener = SetUsernameCommandExecuteListener;
