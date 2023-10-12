import { useEffect, useRef, useState } from 'react';
import './PrivateMessageList.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from '../MessageList/Message';

const PrivateMessagesList = () => {
    const currentUserId = useSelector(state => state.session.currentUserId);
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const privateChat = useSelector(state => state.privateChats[channelId])
    const privateMessages = useSelector(state => state.privateMessages);
    const [messageList, setMessageList] = useState([]);
    const [body, setBody] = useState('');
    const listEnd = useRef();
    const [friendId, setFriendId] = useState(null);
    const friend = useSelector(state => state.users[friendId]);

    useEffect(() => {
        if (privateChat){
            if (privateChat.user1Id === currentUserId){
                setFriendId(privateChat?.user2Id)
            } else {
                setFriendId(privateChat?.user1Id)
            }
        }
    }, [privateChat])

    useEffect(() => {
        if (privateChat) {
            setMessageList(privateChat.messages || []);

            // dispatch(removeUnreadChannel(channel.id))

            // if (channelList?.every(channelNum => !unreadChannels[channelNum])) {
            //     dispatch(removeUnreadServer(serverId))
            // }
        }
    }, [privateChat, privateMessages, dispatch])

    useEffect(() => {
        setBody('');
    }, [serverId, channelId])

    useEffect(() => {
        listEnd.current?.scrollIntoView({behavior: 'instant'})
    }, [messageList])

    const handleMessageSubmit = e => {
        e.preventDefault();
        if (body.length > 0) {
            // dispatch(); // create private message
            setBody('');
            listEnd.current?.scrollIntoView({behavior: 'instant'});
        }
    }

    return (
        <div className='messages-panel'>
            <div className="message-list-holder">
                {messageList.map((messageId, ii) => {
                    return <Message
                                key={messageId}
                                message={privateMessages[messageId]}
                                prevMessage={(ii > 0) ? privateMessages[messageList[ii-1]] : null}
                                deleteButtonVisible={privateMessages[messageId].authorId === currentUserId}
                                editButtonVisible={privateMessages[messageId].authorId === currentUserId}/>
                })}
                <div ref={listEnd} className="message-end"/>
            </div>
            <form className="message-input-form" onSubmit={handleMessageSubmit}>
                <input type="text" value={body} placeholder={`Message @${friend.username}`} onChange={e => setBody(e.target.value)}/>
            </form>
        </div>
    )
}

export default PrivateMessagesList;
