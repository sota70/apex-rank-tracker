"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
/**
 * イベントの種類
 * 今は二つしかないが、今後増えていく可能性がある
 */
var EventType;
(function (EventType) {
    EventType[EventType["COMMAND"] = 0] = "COMMAND";
    EventType[EventType["SERVER"] = 1] = "SERVER";
})(EventType = exports.EventType || (exports.EventType = {}));
