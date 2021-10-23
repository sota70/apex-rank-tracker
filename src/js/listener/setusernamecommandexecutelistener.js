"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUsernameCommandExecuteListener = void 0;
var userinfowriter_1 = require("../userinfo/userinfowriter");
var SetUsernameCommandExecuteListener = /** @class */ (function () {
    function SetUsernameCommandExecuteListener() {
    }
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
