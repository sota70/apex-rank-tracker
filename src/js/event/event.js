"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(name, type) {
        this.name = name;
        this.type = type;
        this.eventListeners = [];
        this.registerListeners();
    }
    Event.prototype.addEventListener = function (eventListener) {
        this.eventListeners.push(eventListener);
    };
    return Event;
}());
exports.Event = Event;
