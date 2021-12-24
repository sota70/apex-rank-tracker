import { ServerReceivePostEvent } from "../event/serverreceivepostevent";
import { EventListener } from "./eventlistener";

/**
 * botサーバーがWakeUpメソッドを受け取った時の処理をするリスナークラス
 * WakeUpメソッドとはサーバーがスリープ状態にならないように、一定の間隔で送信されるメソッドのこと
 */
export class ServerReceiveWakeUpPostListener implements EventListener {

    /**
     * botサーバーがWakeUpメソッドを受け取った時の処理をするメソッド
     * サーバーログに特定のメッセージを出力するだけだが、これをするだけでサーバーは稼働し続けてくれる
     * 
     * @param event botサーバーが外部からPostを受け取った時の処理に使うイベント
     */
    public handle(event: ServerReceivePostEvent) {
        const { res, methodType } = event
        if (methodType !== 'wake') {
            res.end()
            return
        }
        console.log(`post: ${methodType}`)
        console.log('Woke up in post')
        res.end()
    }
}