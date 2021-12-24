import { Event } from "../event/event";

/**
 * イベントを処理するリスナーのベースクラス
 * 処理したい{@link Event}を引数にとることで、イベントを処理できる
 */
export interface EventListener {

    /**
     * イベントを処理するメソッド
     * 
     * @param event 処理したいイベントの種類
     */
    handle(event: Event): void
}