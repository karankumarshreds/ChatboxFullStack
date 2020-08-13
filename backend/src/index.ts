import express from 'express';
import socketio from 'socket.io';
import http from "http"
import { router } from './router';

const PORT = process.env.port || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connect', socket => {
    console.log('Connection logged (backend)');
    socket.on('disconnect', () => {
        console.log('Connection disconnected (backend)')
    });
});

app.use(router);

server.listen(PORT, () => {
    console.log('Backend listening on port:', PORT);
});

