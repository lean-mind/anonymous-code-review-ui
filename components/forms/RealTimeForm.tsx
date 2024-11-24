"use client"

import {AnimatePresence, motion} from "framer-motion";
import {RepositorySubmitButton} from "@/components/forms/RepositorySubmitButton";
import {usePusherState} from "@/hooks/usePusherState";
import {useTransition} from "react";
import {openAnonymousRandomRepository} from "@/lib/infrastructure/server/actions";
import { DeleteAllReposButton } from "@/components/forms/DeleteAllReposButton";

export const RealTimeForm = () => {
    const repositories = usePusherState();
    const [, startTransition] = useTransition();
    const isLocal = process.env.NODE_ENV === 'development';

    const handleSendToServer = async () => {
        startTransition(async () => {
            try {
                const urls = repositories.map((repository) => repository.url);
                const url = await openAnonymousRandomRepository(urls);

                if (url) {
                    window.open(url, '_blank');
                }
            } catch (error) {
                console.error("Error llamando a la Server Action:", error);
            }
        });
    };
    
    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#39b3c2] flex items-center justify-between">
                    Participantes
                    <span className="bg-[#2A2A2E] px-3 py-1 rounded-full text-sm">
                    {repositories.length}
                </span>
                </h2>
                <div className="h-64 overflow-y-auto bg-[#2A2A2E] rounded-lg p-4">
                    <AnimatePresence>
                        {repositories.map((participant, index) => (
                            <motion.div
                                key={participant.randomName}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.3}}
                                className="bg-[#1C1C1E] rounded-md p-2 mb-2 shadow flex items-center"
                            >
                                <div
                                    className="w-8 h-8 rounded-full bg-[#39b3c2] flex items-center justify-center text-white font-bold mr-3">
                                    {index + 1}
                                </div>
                                <span className="text-gray-200">{participant.randomName}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <section className="flex">
                <form action={handleSendToServer} className="w-full">
                    <RepositorySubmitButton repositories={repositories}/>
                </form>
                { isLocal ? <DeleteAllReposButton /> : <></>}
            </section>
        </>
)
}