import { io } from 'socket.io-client'

export const initSocket = async () => {
    const backendUrl = "https://collaborative-code-editor-server-1.onrender.com";
    console.log(`Connecting to backend URL: ${backendUrl}`);
    const options = {
        'force new connection': true,
        reconnectionAttempt: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };
    return io("https://collaborative-code-editor-server-1.onrender.com", options);
}