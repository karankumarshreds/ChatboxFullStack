import Router from 'next/router';
// import { } from 'react-dom'

const ChatHeader = ({ room }) => {
    return (<div>
        <h1>{room}</h1>
        <a href="/">LEAVE</a>
    </div>)
}

export default ChatHeader;