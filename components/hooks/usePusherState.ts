// Definimos el tipo del estado almacenado
import {useSyncExternalStore} from 'react';
import {Repository} from "@/lib/types";
import {RealTimeStore} from "@/lib/RealTimeStore";
import {PusherManager} from "@/lib/PusherManager";

const pusherManager = new PusherManager(
    process.env.NEXT_PUBLIC_PUSHER_KEY as string,
    process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string
);

const realTimeStore = new RealTimeStore<Repository>(
    pusherManager, // Servicio de tiempo real
    'repository-channel', // Nombre del canal
    'add-repository' // Evento
);

const useRealTimeState = <T>(store: RealTimeStore<T>): T[] => {
    return useSyncExternalStore(
        (callback) => store.subscribe(callback),
        () => store.getCurrentState()
    );
};

// Hook para consumir la tienda Pusher con `useSyncExternalStore`
export const usePusherState = (): Repository[] => {
    return useRealTimeState(realTimeStore);
};