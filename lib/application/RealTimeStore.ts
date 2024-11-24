import {Channel} from "pusher-js";
import type { RealTimeManager } from "@/lib/domain/types";

type EmptyFunction = () => void;
type Subscribers<T> = (state: T[]) => void;

export class RealTimeStore<T> {
    private subscribers: Array<Subscribers<T>> = [];
    private currentState: T[] = [];
    private readonly channel: Channel;

    constructor(private readonly realTimeManager: RealTimeManager<T>, channelName: string, event: string) {
        this.channel = this.realTimeManager.subscribeToChannel(channelName, event, (data: T) => {
            this.updateState(data);
        });
    }

    private updateState(newData: T) {
        this.currentState = [...this.currentState, newData];
        this.notifySubscribers();
    }

    private notifySubscribers() {
        for (const subscriber of this.subscribers) {
            subscriber(this.currentState);
        }
    }

    private cleanUpSubscription(callback: Subscribers<T>) {
        this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
    }

    public subscribe(callback: Subscribers<T>): EmptyFunction {
        this.subscribers.push(callback);
        return () => {
            this.cleanUpSubscription(callback);
        };
    }

    public getCurrentState(): T[] {
        return this.currentState;
    }
}