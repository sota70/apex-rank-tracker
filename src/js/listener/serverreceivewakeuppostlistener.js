"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerReceiveWakeUpPostListener = void 0;
/**
 * botサーバーがWakeUpメソッドを受け取った時の処理をするリスナークラス
 * WakeUpメソッドとはサーバーがスリープ状態にならないように、一定の間隔で送信されるメソッドのこと
 */
var ServerReceiveWakeUpPostListener = /** @class */ (function () {
    function ServerReceiveWakeUpPostListener() {
    }
    /**
     * botサーバーがWakeUpメソッドを受け取った時の処理をするメソッド
     * サーバーログに特定のメッセージを出力するだけだが、これをするだけでサーバーは稼働し続けてくれる
     *
     * @param event botサーバーが外部からPostを受け取った時の処理に使うイベント
     */
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
