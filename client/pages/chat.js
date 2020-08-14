import { useEffect } from 'react';
import { DataContext } from '../context/DataProvider';
import io from 'socket.io-client';
import { useContext } from 'react';

let socket;

const Chat = ({ karan }) => {
    const backendEndpoint = 'http://localhost:5000';
    const [state, dispatch] = useContext(DataContext);
    useEffect(() => {
        socket = io(backendEndpoint);
    }, [backendEndpoint])

    return <h1>{karan}</h1>
}

Chat.getInitialProps = async (ctx) => {
    return { karan: 'karan' }
}

export default Chat;

