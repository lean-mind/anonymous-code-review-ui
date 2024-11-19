import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import {RepositoryManager} from "@/src/backend/repositoryManager";
import {Octokit} from "octokit";
import fs from "fs";

export class GitRepositoryManager implements RepositoryManager {
    async clone(url: string, path: string): Promise<void> {
        try {
            await git.clone({
                fs,
                http,
                dir: path,
                url: url,
                singleBranch: true,
                depth: 1,
            });
            console.log('Clonado exitosamente');
        } catch (error) {
            console.error('Error al clonar el repositorio:', error);
        }
    }

    async createInRemote(repoName: string) {
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN,
        });
        try {
            const response = await octokit.rest.repos.createInOrg({
                org: 'anonymous-code-review',
                name: repoName,
                private: false,  // O puedes usar false si quieres que sea público
                description: 'Descripción del repositorio',
                auto_init: true,
            });

            console.log('Repositorio creado con éxito:', response.data);
            return response.data.clone_url;
        } catch (error) {
            console.error('Error al crear el repositorio:', error);
            throw error;
        }
    }

    async push(repoPath: string, newRepoUrl: string): Promise<void> {
        try {
            // Inicializar el repositorio
            await git.init({fs, dir: repoPath, defaultBranch: 'main'});

            // Crear la rama "main"
            await git.branch({fs, dir: repoPath, ref: 'main'});

            // Configurar el usuario
            await git.setConfig({fs, dir: repoPath, path: 'user.email', value: 'anonymous@codereview.com'});
            await git.setConfig({fs, dir: repoPath, path: 'user.name', value: 'Anonymous Code Review'});

            // Añadir todos los archivos al índice
            await git.add({fs, dir: repoPath, filepath: '.'});

            // Hacer el commit inicial
            await git.commit({
                fs,
                dir: repoPath,
                message: 'Initial commit',
                author: {
                    name: 'Anonymous Code Review',
                    email: 'anonymous@codereview.com',
                },
            });

            // Agregar el repositorio remoto
            //const tokenUrl = `https://${process.env.GITHUB_TOKEN}@${newRepoUrl.replace('https://', '')}`;
            await git.addRemote({fs, dir: repoPath, remote: 'origin', url: newRepoUrl});

            // Hacer el push al remoto
            await git.push({
                fs,
                http,
                dir: repoPath,
                remote: 'origin',
                ref: 'main',
                onAuth: () => ({username: process.env.GITHUB_TOKEN}),
                force: true, // Opcional, pero ayuda en un repo recién creado
            });

            console.log('Código subido con éxito al nuevo repositorio.');
        } catch (error) {
            console.error('Error al subir el código al nuevo repositorio:', error);
        }
    }

    async deleteAllReposInOrg(org: string) {
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN,
        });
        try {
            // Obtener todos los repositorios de la organización
            const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
                org,
                per_page: 100,
            });

            console.log(`Repositorios encontrados en la organización "${org}": ${repos.length}`);

            // Eliminar cada repositorio
            for (const repo of repos) {
                try {
                    await octokit.rest.repos.delete({
                        owner: org,
                        repo: repo.name,
                    });
                    console.log(`Repositorio eliminado: ${repo.name}`);
                } catch (error) {
                    console.error(`Error al eliminar el repositorio ${repo.name}:`, error);
                }
            }

            console.log('Todos los repositorios han sido eliminados.');
        } catch (error) {
            console.error('Error al obtener repositorios:', error);
        }
    }
}