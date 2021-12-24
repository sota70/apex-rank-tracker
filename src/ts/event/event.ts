import { EventType } from "./eventtype"
import { EventListener } from "../listener/eventlistener"

/**
 * 特定のアクションが起こった時の処理をする時に使うクラス
 * {@link EventListener}のhandleメソッドの第1引数でもある
 * * 基本的には{@link EventListener}とセットで使う
 * 
 * @property {@link name} イベントの名前
 * @property {@link type} イベントの種類
 * @property {@link eventListeners} イベントを処理するリスナークラス
 */
export abstract class Event {

    public name: String
    public type: EventType
    public eventListeners: Array<EventListener>

    /**
     * プロパティの初期化と同時に{@link Event}が使う{@link EventListener}も登録しておくコンストラクタ
     * 
     * @param name イベントの名前
     * @param type イベントの種類
     */
    constructor(name: String, type: EventType) {
        this.name = name
        this.type = type
        this.eventListeners = []
        this.registerListeners()
    }

    /**
     * {@link Event}が使う{@link EventListener}を登録するメソッド
     */
    abstract registerListeners(): void

    /**
     * {@link EventListener}を登録する時に使うメソッド
     * 
     * @param eventListener イベントを処理するクラス
     */
    public addEventListener(eventListener: EventListener) {
        this.eventListeners.push(eventListener)
    }
}