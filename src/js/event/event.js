"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(name, type, eventListener) {
        this.name = name;
        this.type = type;
        this.eventListener = eventListener;
    }
    return Event;
}());
exports.Event = Event;
