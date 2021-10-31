import { ServerReceiveMethodEvent } from "../event/serverreceivemethodevent";
import { ServerReceivePostEvent } from "../event/serverreceivepostevent";
import { EventListener } from "./eventlistener";

export class ServerReceivePostMethodListener implements EventListener {

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

    private callServerReceivePostEvent(event: ServerReceivePostEvent) {
        event.eventListeners.forEach(listener => {
            listener.handle(event)
        })
    }
}