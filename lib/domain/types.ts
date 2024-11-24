import {Channel} from "pusher-js";

interface Repository {
    url: string;
    randomName: string;
}

interface RealTimeManager<T> {
    subscribeToChannel(channelName: string, event: string, callback: (data: T) => void): Channel;
    disconnect(): void;
}

interface RepositoryManager {
    clone(url: string, path: string): Promise<void>;
    push(repoPath: string, newRepoUrl: string): Promise<void>;
    createInRemote(repoName: string): Promise<string>;
}

export type {
    Repository,
    RealTimeManager,
    RepositoryManager
}