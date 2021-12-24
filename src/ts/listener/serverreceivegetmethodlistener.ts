import { ServerReceiveMethodEvent } from "../event/serverreceivemethodevent";
import { EventListener } from "./eventlistener";

/**
 * ボットサーバーにGetメソッドが届いたときの処理をするリスナークラス
 */
export class ServerReceiveGetMethodListener implements EventListener {

    /**
     * ボットサーバーにGetメソッドが届いたときの処理をするメソッド
     * 
     * @param event ボットサーバーがGetメソッドを受け取った時に使うイベント
     * @returns 送信相手に対して、ボットサーバーの情報をテキストにして返す
     */
    public handle(event: ServerReceiveMethodEvent) {
        const { res } = event
        if (event.method !== 'GET') {
            res.end()
            return
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end()
    }
}