import { useEffect, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import io from 'socket.io-client';
import { useContext } from 'react';
import ChatHeader from '../components/ChatHeader';
import Messages from '../components/Messages';

let socket;

const Chat = () => {
    const BACKEND_URI = 'http://localhost:5000';
    const [{ name, room }, dispatch] = useContext(DataContext);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket = io(BACKEND_URI);

        // SEND DATA TO BACKEND ON 'JOIN' CHANNEL
        socket.emit('join', { name, room }, ({ error }) => {
            console.log('RECIEVED AN ERROR FROM THE BACKEND WHILE JOINING :', error);
        });

        // WHILE UNMOUNTING
        return () => {
            socket.emit('disconnect');
            socket.off();
            console.log('DISCONNECTING THE ROOM')
        }
    }, [BACKEND_URI]);

    useEffect(() => {
        // LISTEN ON FOR MESSAGES ON 'MESSAGE' CHANNEL
        socket.on('message', (recievedMessage) => {
            console.log(`ADDING NEW MESSAGE "${recievedMessage.text}" TO MESSAGES`)
            setMessages(messages => [...messages, recievedMessage])
        })
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return false;
        }
        // CALLBACK DEFINED IN THE BACKEND LISTENER
        socket.emit('sendMessage', message, ({ error }) => {
            console.log('RECIEVED AN ERROR FROM THE BACKEND WHILE JOINING :', error)
        })
        setMessage('')
    }
    // console.log('MESSAGES =', messages)
    return (
        <div>
            <h1>Chat</h1>
            <ChatHeader room={room} />
            <Messages messages={messages} name={name} />
            <form onSubmit={(e) => sendMessage(e)}>
                <input value={message} onChange={e => setMessage(e.target.value)} />
                <button type="submit">Send message</button>
            </form>
        </div>
    )
}

export default Chat;

