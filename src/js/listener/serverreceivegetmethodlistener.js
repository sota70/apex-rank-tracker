"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerReceiveGetMethodListener = void 0;
var ServerReceiveGetMethodListener = /** @class */ (function () {
    function ServerReceiveGetMethodListener() {
    }
    ServerReceiveGetMethodListener.prototype.handle = function (event) {
        var res = event.res;
        if (event.method !== 'GET') {
            res.end();
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
    };
    return ServerReceiveGetMethodListener;
}());
exports.ServerReceiveGetMethodListener = ServerReceiveGetMethodListener;
