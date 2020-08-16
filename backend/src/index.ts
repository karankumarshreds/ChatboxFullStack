import express from 'express';
import socketio from 'socket.io';
import http from "http";
import { router } from './router';

const PORT = process.env.port || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// CHAT FUNCTIONS 
import { addUser, removeUser, getUser, getUsersInRoom } from './chat-functions';

io.on('connection', socket => {

    // RECIEVE DATA ON 'JOIN' CHANNEL
    socket.on('join', ({ name, room }, callback) => {
        console.log('PARAM RECIEVED ON BACKEND', name, room);
        const data = addUser({ id: socket.id, name, room });
        if (data.error) {
            return callback(data.error)
        }
        socket.join(data.user!.room);
        /** We are assuming 'message' events are related to admin and will be generated on the backend */
        socket.emit('message', { user: 'admin', text: `${data.user!.name} welcome to the chat...` });
        socket.broadcast.to(data.user!.room).emit('message', { user: 'admin', text: `${data.user!.name} has joined the chat...` });
        // will show the errors on the client side
        // callback();
    })
    /** We are assuming 'sendMessage' events are related to users and will be coming from the client side */
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        socket.to(user!.room).emit('message', { user: user!.name, text: message });
        callback();
    })
    // ON ERROR 
    socket.on('error', () => {
        console.log('Error!');
    })
    // ON DISCONNECT 
    socket.on('disconnect', () => {
        console.log('Connection disconnected (backend)')
    });

});

// ROUTES
app.use(router);

server.listen(PORT, () => {
    console.log('Backend listening on port:', PORT);
});

