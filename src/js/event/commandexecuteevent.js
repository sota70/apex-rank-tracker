"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecuteEvent = void 0;
var setcommandchannelcommandexecutelistener_1 = require("../listener/setcommandchannelcommandexecutelistener");
var setusernamecommandexecutelistener_1 = require("../listener/setusernamecommandexecutelistener");
var showapexstatuscommandexecutelistener_1 = require("../listener/showapexstatuscommandexecutelistener");
var event_1 = require("./event");
var eventtype_1 = require("./eventtype");
/**
 * ディスコードユーザーが打ったコマンドを処理する時に使われるイベントクラス
 *
 * @property {@link interaction} コマンドのデータの取得および利用が可能なクラス
 * @property {@link commandName} コマンドの名前
 */
var CommandExecuteEvent = /** @class */ (function (_super) {
    __extends(CommandExecuteEvent, _super);
    function CommandExecuteEvent(interaction) {
        var _this = _super.call(this, 'commandexecuteevent', eventtype_1.EventType.COMMAND) || this;
        _this.interaction = interaction;
        _this.commandName = interaction.commandName;
        return _this;
    }
    /**
     * {@link CommandExecuteEvent}クラスで使う{@link EventListener}を登録するメソッド
     */
    CommandExecuteEvent.prototype.registerListeners = function () {
        this.addEventListener(new showapexstatuscommandexecutelistener_1.ShowApexStatusCommandExecuteListener());
        this.addEventListener(new setcommandchannelcommandexecutelistener_1.SetCommandChannelCommandExecuteListener());
        this.addEventListener(new setusernamecommandexecutelistener_1.SetUsernameCommandExecuteListener());
    };
    return CommandExecuteEvent;
}(event_1.Event));
exports.CommandExecuteEvent = CommandExecuteEvent;
