import { Client } from "discord.js";
import { IncomingMessage, ServerResponse } from "http";
import { ServerReceiveUpdateRankPostListener } from "../listener/serverreceiveupdaterankpostlistener";
import { ServerReceiveWakeUpPostListener } from "../listener/serverreceivewakeuppostlistener";
import { Event } from "./event";
import { EventType } from "./eventtype";

export class ServerReceivePostEvent extends Event {

    public res: ServerResponse
    public client: Client
    public methodType: string

    constructor(
        res: ServerResponse,
        client: Client,
        methodType: string
    ) {
        super("serverreceivepostevent", EventType.SERVER)
        this.res = res
        this.client = client
        this.methodType = methodType
    }

    override registerListeners() {
        this.addEventListener(new ServerReceiveWakeUpPostListener())
        this.addEventListener(new ServerReceiveUpdateRankPostListener())
    }
}