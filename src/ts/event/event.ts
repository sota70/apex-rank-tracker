import { EventType } from "./eventtype"
import { EventListener } from "../listener/eventlistener"

export abstract class Event {

    public name: String
    public type: EventType
    public eventListeners: Array<EventListener>

    constructor(name: String, type: EventType) {
        this.name = name
        this.type = type
        this.eventListeners = []
        this.registerListeners()
    }

    abstract registerListeners(): void

    public addEventListener(eventListener: EventListener) {
        this.eventListeners.push(eventListener)
    }
}