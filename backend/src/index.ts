import express from 'express';
import socketio from 'socket.io';
import http from "http"
import { router } from './router';

const PORT = process.env.port || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connect', () => {
    console.log('EVENT!')
})

app.use(router);

server.listen(PORT, () => {
    console.log('Backend listening on port:', PORT);
});

