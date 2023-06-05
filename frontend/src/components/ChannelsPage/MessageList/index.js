import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './MessageList.css';
import Message from './Message';
import { useEffect } from 'react';
import { useState } from 'react';

const MessageList = () => {
    const {channelId} = useParams();
    const channel = useSelector(state => state.channels[channelId])
    const messages = useSelector(state => state.messages)
    let [messageList, setMessageList] = useState([]);

    useEffect(() => {
        if (channel) {
            setMessageList(channel.messages);
        }
    }, [channel])

    return (
        <div className="message-list-holder">
            {messageList.map(messageId => {
                return <Message key={messageId} message={messages[messageId]}/>
            })}
        </div>
    )
}

export default MessageList;
