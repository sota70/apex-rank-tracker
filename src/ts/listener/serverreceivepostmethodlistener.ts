import { ServerReceiveMethodEvent } from "../event/serverreceivemethodevent";
import { ServerReceivePostEvent } from "../event/serverreceivepostevent";
import { EventListener } from "./eventlistener";

/**
 * ボットサーバーがPostメソッドを受け取った時の処理をするリスナークラス
 */
export class ServerReceivePostMethodListener implements EventListener {

    /**
     * ボットサーバーがPostメソッドを受け取った時の処理をするメソッド
     * もらったPostデータを、種類に対応したリスナーに渡して処理させる
     * もらったデータが空の場合はそこで処理を止める
     * 
     * @param event ボットサーバーにPostメソッドが届いたときに使うイベント
     */
    public handle(event: ServerReceiveMethodEvent) {
        const { req, res, client } = event
        if (event.method !== 'POST') {
            res.end()
            return
        }
        var data = ''
        req.on('data', function (chunk) { data += chunk })
        req.on('end', async () => {
            if (!data) {
                res.end('No Post Data')
                return
            }
            var dataObject = new URLSearchParams(data)
            this.callServerReceivePostEvent(new ServerReceivePostEvent(res, client, dataObject.get('type')!))
        })
    }

    // もらったPostデータをPostデータ処理用リスナーに渡すメソッド
    private callServerReceivePostEvent(event: ServerReceivePostEvent) {
        event.eventListeners.forEach(listener => {
            listener.handle(event)
        })
    }
}