"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
/**
 * 特定のアクションが起こった時の処理をする時に使うクラス
 * {@link EventListener}のhandleメソッドの第1引数でもある
 * * 基本的には{@link EventListener}とセットで使う
 *
 * @property {@link name} イベントの名前
 * @property {@link type} イベントの種類
 * @property {@link eventListeners} イベントを処理するリスナークラス
 */
var Event = /** @class */ (function () {
    /**
     * プロパティの初期化と同時に{@link Event}が使う{@link EventListener}も登録しておくコンストラクタ
     *
     * @param name イベントの名前
     * @param type イベントの種類
     */
    function Event(name, type) {
        this.name = name;
        this.type = type;
        this.eventListeners = [];
        this.registerListeners();
    }
    /**
     * {@link EventListener}を登録する時に使うメソッド
     *
     * @param eventListener イベントを処理するクラス
     */
    Event.prototype.addEventListener = function (eventListener) {
        this.eventListeners.push(eventListener);
    };
    return Event;
}());
exports.Event = Event;
