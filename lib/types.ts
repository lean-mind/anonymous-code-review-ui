import {Channel} from "pusher-js";

interface Repository {
    url: string;
    randomName: string;
}

interface RealTimeManager<T> {
    subscribeToChannel(channelName: string, event: string, callback: (data: T) => void): Channel;
    disconnect(): void;
}

export type {
    Repository,
    RealTimeManager
}