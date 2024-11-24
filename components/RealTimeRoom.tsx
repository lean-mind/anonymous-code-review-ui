"use client"
import {useSyncExternalStore} from 'react';
import Pusher, {Channel} from 'pusher-js';
import {Card, CardContent} from "@/components/ui/card";
import {Code2, Shuffle} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {openAnonymousRandomRepositoryServerActionV2} from "@/lib/backend/server";

// Definimos el tipo del estado almacenado
interface Repository {
    url: string;
    randomName: string;
}

// Creamos una tienda (store) para gestionar la suscripción y el estado
const createPusherStore = () => {
    // Lista de suscriptores (callbacks)
    let subscribers: Array<(state: Repository[]) => void> = [];

    // Estado actual que se sincroniza con Pusher
    let currentState: Repository[] = [];

    // Notificar a todos los suscriptores sobre un cambio en el estado
    const notifySubscribers = () => {
        for (const subscriber of subscribers) {
            subscriber(currentState);
        }
    };

    // Función para registrar suscripciones
    const subscribe = (callback: (state: Repository[]) => void): (() => void) => {
        subscribers.push(callback);
        // Retornamos una función de limpieza para desuscribirse
        return () => {
            subscribers = subscribers.filter((sub) => sub !== callback);
        };
    };

    // Función para actualizar el estado cuando llegan nuevos datos desde Pusher
    const updateState = (newData: Repository) => {
        currentState = [...currentState, newData];
        notifySubscribers(); // Notificamos a los suscriptores que el estado cambió
    };

    // Función para obtener el estado actual
    const getSnapshot = (): Repository[] => currentState;

    // Configuración de Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    // Suscripción al canal y evento de Pusher
    const channel: Channel = pusher.subscribe('repository-channel');
    channel.bind('add-repository', (data: Repository) => {
        updateState(data); // Actualizamos el estado con los datos recibidos
    });

    // Retornamos la API de la tienda
    return {
        subscribe,
        getSnapshot,
        cleanup: () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        },
    };
};

// Creamos la tienda Pusher
const pusherStore = createPusherStore();

// Hook para consumir la tienda Pusher con `useSyncExternalStore`
const usePusherState = (): Repository[] => {
    return useSyncExternalStore(pusherStore.subscribe, pusherStore.getSnapshot);
};

const RealTimeRoom = () => {
    const repositories = usePusherState();

    const handleSendToServer = async () => {
        try {
            const urls = repositories.map((repository) => repository.url);
            const url = await openAnonymousRandomRepositoryServerActionV2(urls);

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
                <Button
                    className="w-full bg-gradient-to-r from-gray-700 to-[#39b3c2] hover:from-gray-600 hover:to-[#2a8a96] text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    onClick={handleSendToServer}
                >
                    <Shuffle className="mr-2 h-5 w-5"/> {repositories.length === 0 ? '¡Comenzando!' : 'Iniciar Code Review'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default RealTimeRoom;