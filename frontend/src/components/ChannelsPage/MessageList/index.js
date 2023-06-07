import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './MessageList.css';
import Message from './Message';
import { useEffect } from 'react';
import { useState } from 'react';
import { createMessage } from '../../../store/message';
import { useRef } from 'react';
import { removeUnreadChannel, removeUnreadServer } from '../../../store/unread';
// import consumer from '../../../consumer';

const MessageList = () => {
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const channelList = useSelector(state => state.servers[serverId]?.channels)
    const serverOwnerId = useSelector(state => state.servers[serverId]?.ownerId);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const channel = useSelector(state => state.channels[channelId])
    const messages = useSelector(state => state.messages)
    const unreadChannels = useSelector(state => state.unread.channels)
    let [messageList, setMessageList] = useState([]);
    let [body, setBody] = useState('');
    const listEnd = useRef();

    useEffect(() => {
        if (channel) {
            setMessageList(channel.messages || []);
            dispatch(removeUnreadChannel(channel.id))

            if (channelList?.every(channelNum => !unreadChannels[channelNum])) {
                dispatch(removeUnreadServer(serverId))
            }
        }
    }, [channel, messages, dispatch])

    useEffect(() => {
        listEnd.current?.scrollIntoView({behavior: 'instant'})
    }, [messageList])

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
