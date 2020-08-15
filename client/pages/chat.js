import { useEffect } from 'react';
import { DataContext } from '../context/DataProvider';
import io from 'socket.io-client';
import { useContext } from 'react';

let socket;

const Chat = () => {
    // const backendEndpoint = 'http://localhost:5000';
    const [state, dispatch] = useContext(DataContext);
    console.log('STATE', state)
    return <h1>{karan}</h1>
}

Chat.getInitialProps = async (ctx) => {
    return {}
}

export default Chat;

