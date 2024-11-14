"use client"
import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
const PusherTest = () => {
    const [message, setMessage] = useState<string>('aguacate');
    const [messages, setMessages] = useState<string[]>([]);
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
        const pusher = new Pusher('981971a5ebfef7ec4460', {
            cluster: 'eu'
        });
        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data: { message: string }) {
            setMessage(data.message);
            setMessages([...messages, data.message]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [messages]);
    return (
        <div>
            <h1>Pusher Test</h1>
            <p>
               El mensaje es: {message}
            </p>
            <h2>Historial de mensajes</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};
export default PusherTest;