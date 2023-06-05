import { useSelector } from 'react-redux';
import './MessageList.css';
import Message from './Message';

const MessageList = () => {
    const messages = useSelector(state => Object.values(state.messages))
    return (
        <div className="message-list-holder">
            {messages.map(message => {
                return <Message key={message.id} message={message}/>
            })}
        </div>
    )
}

export default MessageList;
