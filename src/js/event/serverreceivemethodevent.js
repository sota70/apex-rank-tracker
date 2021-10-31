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
    ServerReceiveMethodEvent.prototype.registerListeners = function () {
        this.addEventListener(new serverreceivegetmethodlistener_1.ServerReceiveGetMethodListener());
        this.addEventListener(new serverreceivepostmethodlistener_1.ServerReceivePostMethodListener());
    };
    return ServerReceiveMethodEvent;
}(event_1.Event));
exports.ServerReceiveMethodEvent = ServerReceiveMethodEvent;
