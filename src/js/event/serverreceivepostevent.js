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
exports.ServerReceivePostEvent = void 0;
var serverreceiveupdaterankpostlistener_1 = require("../listener/serverreceiveupdaterankpostlistener");
var serverreceivewakeuppostlistener_1 = require("../listener/serverreceivewakeuppostlistener");
var event_1 = require("./event");
var eventtype_1 = require("./eventtype");
/**
 * botサーバーに外部からPostを受け取った時に使われるイベントクラス
 *
 * @property {@link res} botサーバーに来るリクエストを処理するクラス
 * @property {@link client} ディスコードのボットを管理するクラス
 * @property {@link methodType} 外部から来たPostのメソッドの種類
 */
var ServerReceivePostEvent = /** @class */ (function (_super) {
    __extends(ServerReceivePostEvent, _super);
    function ServerReceivePostEvent(res, client, methodType) {
        var _this = _super.call(this, "serverreceivepostevent", eventtype_1.EventType.SERVER) || this;
        _this.res = res;
        _this.client = client;
        _this.methodType = methodType;
        return _this;
    }
    /**
     * {@link ServerReceivePostEvent}に対応したリスナーを登録するメソッド
     * {@link ServerReceiveWakeUpPostListener}と{@link ServerReceiveUpdateRankPostListener}に
     * {@link ServerReceivePostEvent}を使わせたいので、この二つをリスナーとして登録しているs
     */
    ServerReceivePostEvent.prototype.registerListeners = function () {
        this.addEventListener(new serverreceivewakeuppostlistener_1.ServerReceiveWakeUpPostListener());
        this.addEventListener(new serverreceiveupdaterankpostlistener_1.ServerReceiveUpdateRankPostListener());
    };
    return ServerReceivePostEvent;
}(event_1.Event));
exports.ServerReceivePostEvent = ServerReceivePostEvent;
