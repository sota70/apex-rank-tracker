"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(name, type, eventListeners) {
        this.name = name;
        this.type = type;
        this.eventListeners = eventListeners;
    }
    Event.prototype.addEventListener = function (eventListener) {
        this.eventListeners.push(eventListener);
    };
    return Event;
}());
exports.Event = Event;
