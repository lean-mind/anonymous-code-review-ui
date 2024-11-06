"use server"

import os from "os";
import fs from "fs";
import path from "path";
import {GitRepositoryManager} from "@/src/backend/gitRepositoryManager";
import {redirect} from "next/navigation";
import {v4 as uuidv4} from 'uuid';
import {RepositoryManager} from "@/src/backend/repositoryManager";
import {randomInt} from "node:crypto";

export async function openAnonymousRandomRepositoryServerAction(formData: FormData) {
    const urls = formData.get("urls") as string
    const urlList = urls.split("\n").filter(url => url.trim() !== "").map(url => url.replace("\r", ""))
    console.log(urlList)
    await execute(urlList, new GitRepositoryManager());
}

export async function deleteAllRepositoriesServerAction() {
    await new GitRepositoryManager().deleteAllReposInOrg("anonymous-code-review");
}

export async function execute(repos: string[], repositoryManager: RepositoryManager) {
    const tmpDir = os.tmpdir();
    const repoUrl = getRandomFrom(repos);
    const repoName = removeGitExtensionFrom(repoUrl);
    const repoPath = path.join(tmpDir, repoName);

    await cloneRepository(repoPath, repoName, repoUrl, repositoryManager);
    makeRepositoryAnonymous(repoPath, repoName);

    const newRepoUrl = await repositoryManager.createInRemote(`${repoName}-${uuidv4()}`);
    await repositoryManager.push(repoPath, newRepoUrl);
    const newRepoDevUrl = createCodeSharingUrl(newRepoUrl);
    console.log(`Redirigiendo a: ${newRepoDevUrl}`);
    redirect(newRepoDevUrl);
}

async function cloneRepository(repoPath: string, repoName: string, repoUrl: string, repoCloner: RepositoryManager) {
    if (fs.existsSync(repoPath)) {
        fs.rmSync(repoPath, {recursive: true, force: true});
        console.log(`Existing repository directory for ${repoName} removed.`);
    }

    console.log(`Cloning repository ${repoUrl}...`);
    await repoCloner.clone(repoUrl, repoPath);
    console.log(`Repository cloned to: ${repoPath}`);
}

function makeRepositoryAnonymous(repoPath: string, repoName: string) {
    const gitDir = path.join(repoPath, ".git");
    if (fs.existsSync(gitDir)) {
        fs.rmSync(gitDir, {recursive: true, force: true});
        console.log(`\`.git\` directory removed for ${repoName}.`);
    } else {
        console.log(`\`.git\` directory does not exist for ${repoName}.`);
    }
}

function createCodeSharingUrl(newRepoUrl: string) {
    return newRepoUrl.replace('.com', '.dev').replace('.git', '');
}

function getRandomFrom(repos: string[]) {
    const randomIndex = randomInt(0, repos.length);
    return repos[randomIndex];
}

function removeGitExtensionFrom(repoUrl: string) {
    return path.basename(repoUrl, ".git");
}