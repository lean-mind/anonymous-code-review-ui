"use client"
import React, {useEffect, useRef, useState} from 'react';
import Pusher from 'pusher-js';
import {Card, CardContent} from "@/components/ui/card";
import {Code2, Shuffle} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {openAnonymousRandomRepositoryServerAction} from "@/lib/backend/server";

const RealTimeRoom = () => {
    const [repositories, setRepositories] = useState<string[]>([]);
    const [repositoriesByName, setRepositoriesByName] = useState<string[]>([]);
    const repositoriesRef = useRef<string[]>([]);
    const repositoriesByNameRef = useRef<string[]>([]);

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher(
            process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
        });

        console.log("Pusher variables", process.env.PUSHER_KEY, process.env.PUSHER_CLUSTER);

        const channel = pusher.subscribe('repository-channel');
        channel.bind('add-repository', function (data: { message: string, randomName: string }) {
            repositoriesRef.current = [...repositoriesRef.current, data.message];
            repositoriesByNameRef.current = [...repositoriesByNameRef.current, data.randomName];
            setRepositories([...repositoriesRef.current]);
            setRepositoriesByName([...repositoriesByNameRef.current]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);

    const handleSendToServer = async () => {
        try {
            const url = await openAnonymousRandomRepositoryServerAction(repositories);

            if (url) {
                window.open(url, '_blank');
            }
        } catch (error) {
            console.error("Error llamando a la Server Action:", error);
        }
    };

    return (
        <Card className="w-full max-w-md bg-[#1C1C1E] border-[#2A2A2E] shadow-2xl">
            <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                    <div
                        className="w-20 h-20 bg-gradient-to-br from-gray-700 to-[#39b3c2] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Code2 className="w-10 h-10 text-white"/>
                    </div>
                    <h1 className="text-3xl font-bold text-center text-[#39b3c2]">
                        Sala de Espera
                    </h1>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-[#39b3c2] flex items-center justify-between">
                        Participantes
                        <span className="bg-[#2A2A2E] px-3 py-1 rounded-full text-sm">
                            {repositoriesByName.length}
                        </span>
                    </h2>
                    <div className="h-64 overflow-y-auto bg-[#2A2A2E] rounded-lg p-4">
                        <AnimatePresence>
                            {repositoriesByName.map((participant, index) => (
                                <motion.div
                                    key={participant}
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
                                    <span className="text-gray-200">{participant}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <Button
                    className="w-full bg-gradient-to-r from-gray-700 to-[#39b3c2] hover:from-gray-600 hover:to-[#2a8a96] text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    onClick={handleSendToServer}
                >
                    <Shuffle className="mr-2 h-5 w-5"/> {repositoriesByName.length === 0 ? '¡Comenzando!' : 'Iniciar Code Review'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default RealTimeRoom;