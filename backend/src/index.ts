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
    socket.on('join', ({ name, room }, callback: (params: any) => void) => {
        const data = addUser({ id: socket.id, name, room });
        if (data.error) {
            // will be recieved on the client side 
            return callback({ error: data.error })
        }
        socket.join(data.user!.room);
        /** We are assuming 'message' events are related 
         * to admin and will be generated on the backend */
        socket.emit('message', {
            user: 'admin',
            text: `${data.user!.name} welcome to the chat...`
        });
        /** Notifies everyone in the group except the user 
         * who has joined */
        socket.broadcast.to(data.user!.room).emit('message', {
            user: 'admin',
            text: `${data.user!.name} has joined the chat...`
        });
        io.to(data.user!.room).emit('roomData', {
            room: data.user!.room,
            users: getUsersInRoom(data.user!.room)
        })
    });

    /** We are assuming 'sendMessage' events are related to 
     * users and will be coming from the client side */
    socket.on('sendMessage', (message, callback: (params: any) => void) => {
        const data = getUser(socket.id);
        if (data.error) {
            return callback({ error: data.error })
        }
        // since we are emitting the message to particular room
        // this pushes the message recieved into the group and is 
        // recieved by the frontend on 'message' channel 
        io.to(data.user!.room).emit('message', {
            user: data.user!.name,
            text: message
        });
    });

    // ON ERROR 
    socket.on('error', () => {
        console.log('Error!');
    })
    // ON DISCONNECT 
    socket.on('disconnect', () => {
        console.log('Connection disconnected (backend)')
        removeUser(socket.id)
    });

});

// ROUTES
app.use(router);

server.listen(PORT, () => {
    console.log('Backend listening on port:', PORT);
});

