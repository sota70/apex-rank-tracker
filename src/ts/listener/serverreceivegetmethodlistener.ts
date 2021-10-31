import { ServerReceiveMethodEvent } from "../event/serverreceivemethodevent";
import { EventListener } from "./eventlistener";

export class ServerReceiveGetMethodListener implements EventListener {

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