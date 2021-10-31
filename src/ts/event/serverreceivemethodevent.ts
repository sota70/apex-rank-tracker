import { Client } from "discord.js";
import { IncomingMessage, ServerResponse } from "http";
import { ServerReceiveGetMethodListener } from "../listener/serverreceivegetmethodlistener";
import { ServerReceivePostMethodListener } from "../listener/serverreceivepostmethodlistener";
import { Event } from "./event";
import { EventType } from "./eventtype";

export class ServerReceiveMethodEvent extends Event {

    public method: string
    public req: IncomingMessage
    public res: ServerResponse
    public client: Client

    constructor(
        method: string,
        req: IncomingMessage,
        res: ServerResponse,
        client: Client
    ) {
        super("serverreceivemethodevent", EventType.SERVER)
        this.method = method
        this.req = req
        this.res = res
        this.client = client
    }

    override registerListeners() {
        this.addEventListener(new ServerReceiveGetMethodListener())
        this.addEventListener(new ServerReceivePostMethodListener())
    }
}