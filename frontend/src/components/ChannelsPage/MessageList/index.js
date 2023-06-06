import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './MessageList.css';
import Message from './Message';
import { useEffect } from 'react';
import { useState } from 'react';
import { createMessage } from '../../../store/message';
import { useRef } from 'react';

const MessageList = () => {
    const dispatch = useDispatch();
    const {channelId} = useParams();
    const channel = useSelector(state => state.channels[channelId])
    const messages = useSelector(state => state.messages)
    let [messageList, setMessageList] = useState([]);
    let [body, setBody] = useState('');
    const listEnd = useRef();

    useEffect(() => {
        if (channel) {
            setMessageList(channel.messages);
            listEnd.current?.scrollIntoView({behavior: 'instant'})
        }
    }, [channel, messageList, messages])

    const handleMessageSubmit = e => {
        e.preventDefault();
        dispatch(createMessage(channelId, body));
        setBody('');
        listEnd.current?.scrollIntoView({behavior: 'instant'});
    }

    return (
        <div className='messages-panel'>
            <div className="message-list-holder">
                {messageList.map((messageId, ii) => {
                    return <Message key={messageId} message={messages[messageId]} prevMessage={(ii > 0) ? messages[messageList[ii-1]] : null}/>
                })}
                <div ref={listEnd} className="message-end"/>
            </div>
            <form className="message-input-form" onSubmit={handleMessageSubmit}>
                <input type="text" value={body} placeholder={`Message # ${channel?.channelName.replace(/\s+/g, '-').toLowerCase()}`} onChange={e => setBody(e.target.value)}/>
            </form>
        </div>
    )
}

export default MessageList;
