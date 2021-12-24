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
exports.ServerReceiveMethodEvent = void 0;
var serverreceivegetmethodlistener_1 = require("../listener/serverreceivegetmethodlistener");
var serverreceivepostmethodlistener_1 = require("../listener/serverreceivepostmethodlistener");
var event_1 = require("./event");
var eventtype_1 = require("./eventtype");
/**
 * botサーバーが外部から受け取ったメソッドを処理する時に使われるイベントクラス
 *
 * @property {@link method} 外部から受け取ったメソッド
 * @property {@link req} 外部サーバーから受け取ったデータにアクセス可能なクラス
 * @property {@link res} botサーバーに来るリクエストを処理するクラス
 * @property {@link client} ディスコードのボットを管理するクラス
 */
var ServerReceiveMethodEvent = /** @class */ (function (_super) {
    __extends(ServerReceiveMethodEvent, _super);
    function ServerReceiveMethodEvent(method, req, res, client) {
        var _this = _super.call(this, "serverreceivemethodevent", eventtype_1.EventType.SERVER) || this;
        _this.method = method;
        _this.req = req;
        _this.res = res;
        _this.client = client;
        return _this;
    }
    /**
     * {@link ServerReceiveMethodEvent}に対応したリスナーを登録するメソッド
     * {@link ServerReceiveGetMethodListener}と{@link ServerReceivePostMethodListener}に
     * {@link ServerReceiveMethodEvent}を使わせたいので、この二つをリスナーとして登録しているs
     */
    ServerReceiveMethodEvent.prototype.registerListeners = function () {
        this.addEventListener(new serverreceivegetmethodlistener_1.ServerReceiveGetMethodListener());
        this.addEventListener(new serverreceivepostmethodlistener_1.ServerReceivePostMethodListener());
    };
    return ServerReceiveMethodEvent;
}(event_1.Event));
exports.ServerReceiveMethodEvent = ServerReceiveMethodEvent;
