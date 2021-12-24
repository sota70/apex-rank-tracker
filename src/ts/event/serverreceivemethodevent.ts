import { Client } from "discord.js";
import { IncomingMessage, ServerResponse } from "http";
import { ServerReceiveGetMethodListener } from "../listener/serverreceivegetmethodlistener";
import { ServerReceivePostMethodListener } from "../listener/serverreceivepostmethodlistener";
import { Event } from "./event";
import { EventType } from "./eventtype";

/**
 * botサーバーが外部から受け取ったメソッドを処理する時に使われるイベントクラス
 * 
 * @property {@link method} 外部から受け取ったメソッド
 * @property {@link req} 外部サーバーから受け取ったデータにアクセス可能なクラス
 * @property {@link res} botサーバーに来るリクエストを処理するクラス
 * @property {@link client} ディスコードのボットを管理するクラス
 */
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

    /**
     * {@link ServerReceiveMethodEvent}に対応したリスナーを登録するメソッド
     * {@link ServerReceiveGetMethodListener}と{@link ServerReceivePostMethodListener}に
     * {@link ServerReceiveMethodEvent}を使わせたいので、この二つをリスナーとして登録しているs
     */
    override registerListeners() {
        this.addEventListener(new ServerReceiveGetMethodListener())
        this.addEventListener(new ServerReceivePostMethodListener())
    }
}