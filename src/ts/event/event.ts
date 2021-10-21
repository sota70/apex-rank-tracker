import { EventType } from "./eventtype"
import { EventListener } from "../listener/eventlistener"

export abstract class Event {

    public name: String
    public type: EventType
    public eventListener: EventListener

    constructor(name: String, type: EventType, eventListener: EventListener) {
        this.name = name
        this.type = type
        this.eventListener = eventListener
    }
}