import { ServerReceivePostEvent } from "../event/serverreceivepostevent";
import { EventListener } from "./eventlistener";

export class ServerReceiveWakeUpPostListener implements EventListener {

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