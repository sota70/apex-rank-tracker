import { Event } from "../event/event";

export interface EventListener {

    handle(event: Event): void
}