import Pusher, {Channel} from "pusher-js";
import {RealTimeManager, Repository} from "@/lib/domain/types";

export class PusherManager implements RealTimeManager<Repository> {
    private pusher: Pusher;

    constructor(key: string, cluster: string) {
        this.pusher = new Pusher(key, { cluster });
    }

    public subscribeToChannel(channelName: string, event: string, callback: (data: Repository) => void): Channel {
        return this.pusher
            .subscribe(channelName)
            .bind(event, callback);
    }

    public disconnect(): void {
        this.pusher.disconnect();
    }
}
