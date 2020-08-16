import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

const Messages = ({ messages }) => {
    const renderMessages = messages.map((message, index) => (
        <div key={index}>
            <Message message={message} name={name} />
        </div>
    ));

    return <div>
        <ScrollToBottom>
            {renderMessages}
        </ScrollToBottom>
    </div>
}

export default Messages;