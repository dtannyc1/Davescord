import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './MessageList.css';
import Message from './Message';
import { useEffect } from 'react';
import { useState } from 'react';
import { createMessage, removeMessage } from '../../../store/message';
import { useRef } from 'react';
import consumer from '../../../consumer';
import { addMessage } from '../../../store/message';

const MessageList = () => {
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const serverOwnerId = useSelector(state => state.servers[serverId]?.ownerId);
    const currentUserId = useSelector(state => state.session.currentUserId);
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

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
            { channel: 'ChannelsChannel', id: channelId },
            {
              received: ({type, message, messageId, channelId}) => {
                switch (type) {
                    case 'RECEIVE_MESSAGE':
                        dispatch(addMessage(message, channelId));
                        break;
                    case 'DESTROY_MESSAGE':
                        dispatch(removeMessage(messageId, channelId))
                        break;
                }
              }
            }
        );

        return () => subscription?.unsubscribe();
    }, [channelId, dispatch])

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
                    return <Message
                                key={messageId}
                                message={messages[messageId]}
                                prevMessage={(ii > 0) ? messages[messageList[ii-1]] : null}
                                deleteButtonVisible={messages[messageId].authorId === currentUserId ||
                                                currentUserId === serverOwnerId}
                                editButtonVisible={messages[messageId].authorId === currentUserId}/>
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
