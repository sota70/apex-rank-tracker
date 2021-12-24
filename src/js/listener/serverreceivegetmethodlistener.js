"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerReceiveGetMethodListener = void 0;
/**
 * ボットサーバーにGetメソッドが届いたときの処理をするリスナークラス
 */
var ServerReceiveGetMethodListener = /** @class */ (function () {
    function ServerReceiveGetMethodListener() {
    }
    /**
     * ボットサーバーにGetメソッドが届いたときの処理をするメソッド
     *
     * @param event ボットサーバーがGetメソッドを受け取った時に使うイベント
     * @returns 送信相手に対して、ボットサーバーの情報をテキストにして返す
     */
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
