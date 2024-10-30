import {Option} from "@leanmind/monads";

export interface RepositoryManager {
    clone(url: string, path: string): Promise<void>;
    push(repoPath: string, newRepoUrl: string): Promise<void>;
    createInRemote(repoName: string): Promise<Option<string | null>>;
}