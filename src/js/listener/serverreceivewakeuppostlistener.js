"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerReceiveWakeUpPostListener = void 0;
var ServerReceiveWakeUpPostListener = /** @class */ (function () {
    function ServerReceiveWakeUpPostListener() {
    }
    ServerReceiveWakeUpPostListener.prototype.handle = function (event) {
        var res = event.res, methodType = event.methodType;
        if (methodType !== 'wake') {
            res.end();
            return;
        }
        console.log("post: " + methodType);
        console.log('Woke up in post');
        res.end();
    };
    return ServerReceiveWakeUpPostListener;
}());
exports.ServerReceiveWakeUpPostListener = ServerReceiveWakeUpPostListener;
