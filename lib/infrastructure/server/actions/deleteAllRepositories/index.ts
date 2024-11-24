import {GitRepositoryManager} from "@/lib/infrastructure/repositories/GitRepositoryManager";

export async function deleteAllRepositories() {
    await new GitRepositoryManager().deleteAllReposInOrg("anonymous-code-review");
}
