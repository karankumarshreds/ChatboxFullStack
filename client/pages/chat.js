import { useEffect, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import io from 'socket.io-client';
import { useContext } from 'react';

let socket;

const Chat = ({ karan }) => {
    const BACKEND_URI = 'http://localhost:5000';
    const [{ name, room }, dispatch] = useContext(DataContext);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket = io(BACKEND_URI);

        // SEND DATA TO BACKEND ON 'JOIN' CHANNEL
        console.log('TRYING TO JOIN THE ROOM')
        socket.emit('join', { name, room });

        // WHILE UNMOUNTING
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [name, room]);

    useEffect(() => {
        socket.on('message', (adminMessage) => {
            setMessages([...messages, adminMessage])
        })
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return false;
        }
        // callback is defined and invoked in the backend (arg #3)
        socket.emit('sendMessage', message, () => {
            setMessage('');
        })
    }

    console.log(message, messages);

    return (
        <div>
            <h1>Chat</h1>
            <form onSubmit={(e) => sendMessage(e)}>
                <input value={message} onChange={e => setMessage(e.target.value)} />
                <button type="submit">Send message</button>
            </form>
        </div>
    )
}

Chat.getInitialProps = async (ctx) => {
    return { karan: 'karan' }
}

export default Chat;

