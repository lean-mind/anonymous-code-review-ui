import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {execute} from "@/src/backend/server";

import {RepositoryManager} from "@/src/backend/repositoryManager";
import {Option} from "@leanmind/monads";
import os from "os";
import path from "path";
import fs from "fs";
import {redirect} from "next/navigation";

const uuid = "b7ceb64f-442b-467a-ba12-b95d19f12671";
const repoName = 'Hello-World';
const remoteRepoUrl = `https://github.com/${repoName}-${uuid}.git`;
const remoteCodeSharingRepoUrl = `https://github.dev/${repoName}-${uuid}`;

vi.mock("next/navigation");
vi.mock("uuid", () => ({
    v4: () => uuid
}));

describe("Server should", () => {
    const repoPath = path.join(os.tmpdir(), repoName);
    const gitRepoPath = path.join(repoPath, '.git');

    beforeEach(() => {
        fs.mkdirSync(repoPath, {recursive: true});
        fs.mkdirSync(gitRepoPath, {recursive: true});
    });

    afterEach(() => {
        if (fs.existsSync(repoPath)) {
            fs.rmSync(repoPath, {recursive: true, force: true});
        }
    });


    it("open anonymous random repository given some repositories", async () => {
        const mockCloner = new MockClonerRepository();
        const repo = "https://github.com/octocat/Hello-World";

        await execute([repo], mockCloner);

        expect(mockCloner.clone).toHaveBeenCalledWith(repo, repoPath);
        expect(fs.existsSync(gitRepoPath)).toBeFalsy();
        expect(mockCloner.push).toHaveBeenCalledWith(repoPath, remoteRepoUrl);
        expect(redirect).toHaveBeenCalledWith(remoteCodeSharingRepoUrl);
    });

    it("remove existing repository before cloning", async () => {
        const mockCloner = new MockClonerRepository();
        fs.writeFileSync(path.join(repoPath, "test.txt"), "test");

        await execute(["https://github.com/octocat/Hello-World"], mockCloner);

        expect(fs.existsSync(path.join(repoPath, "test.txt"))).toBeFalsy();
    });


});

class MockClonerRepository implements RepositoryManager {
    clone = vi.fn().mockImplementation(async (repoUrl: string, repoPath: string) => {
        fs.mkdirSync(repoPath, {recursive: true});
        fs.mkdirSync(path.join(repoPath, '.git'), {recursive: true});
    });

    createInRemote = vi.fn().mockImplementation(async () => {
        return Option.of(`${remoteRepoUrl}`);
    });

    push = vi.fn().mockResolvedValue(undefined);
}
