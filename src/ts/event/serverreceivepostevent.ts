import { Client } from "discord.js";
import { IncomingMessage, ServerResponse } from "http";
import { ServerReceiveUpdateRankPostListener } from "../listener/serverreceiveupdaterankpostlistener";
import { ServerReceiveWakeUpPostListener } from "../listener/serverreceivewakeuppostlistener";
import { Event } from "./event";
import { EventType } from "./eventtype";

/**
 * botサーバーに外部からPostを受け取った時に使われるイベントクラス
 * 
 * @property {@link res} botサーバーに来るリクエストを処理するクラス
 * @property {@link client} ディスコードのボットを管理するクラス
 * @property {@link methodType} 外部から来たPostのメソッドの種類
 */
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

    /**
     * {@link ServerReceivePostEvent}に対応したリスナーを登録するメソッド
     * {@link ServerReceiveWakeUpPostListener}と{@link ServerReceiveUpdateRankPostListener}に
     * {@link ServerReceivePostEvent}を使わせたいので、この二つをリスナーとして登録しているs
     */
    override registerListeners() {
        this.addEventListener(new ServerReceiveWakeUpPostListener())
        this.addEventListener(new ServerReceiveUpdateRankPostListener())
    }
}