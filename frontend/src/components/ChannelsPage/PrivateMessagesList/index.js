import { useEffect, useRef, useState } from 'react';
import './PrivateMessagesList.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from '../MessageList/Message';
import { createPrivateMessage, fetchPrivateMessages } from '../../../store/privatemessages';
import { removeUnreadPrivateChat } from '../../../store/unread';

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
    const unreadPrivateMessages = useSelector(state => state.unread.privateChats)

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
        // should fetchPrivateMessages if the data doesnt exist?
        // dispatch(fetchPrivateMessages(channelId))
        if (channelId){
            if (!privateChat?.messages){
                // load all private messages if havent visited it before
                dispatch(fetchPrivateMessages(channelId))
            } else if (unreadPrivateMessages[channelId]){
                // just refetch if there are unread messages?
                dispatch(fetchPrivateMessages(channelId))
            }
        }
    }, [channelId])

    useEffect(() => {
        if (privateChat) {
            // if (channelId) dispatch(fetchPrivateMessages(channelId))
            if (privateChat.messages){
                let data = privateChat.messages.map(id => {return privateMessages[id]?.id});
                if (data.every(el => el)) {
                    setMessageList(privateChat.messages)
                } else {
                    dispatch(fetchPrivateMessages(channelId))
                }
            }
            // setMessageList(privateChat?.messages || []);
            dispatch(removeUnreadPrivateChat(channelId))
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
            dispatch(createPrivateMessage(channelId, body))
            setBody('');
            listEnd.current?.scrollIntoView({behavior: 'instant'});
        }
    }

    return (
        <div className='private-messages-panel'>
            <div className="message-list-holder">
                {messageList.map((messageId, ii) => {
                    return <Message
                                key={messageId}
                                message={privateMessages[messageId]}
                                prevMessage={(ii > 0) ? privateMessages[messageList[ii-1]] : null}
                                deleteButtonVisible={privateMessages[messageId].authorId === currentUserId}
                                editButtonVisible={privateMessages[messageId].authorId === currentUserId}
                                isPrivateMessage={true}/>
                })}
                <div ref={listEnd} className="message-end"/>
            </div>
            <form className="message-input-form" onSubmit={handleMessageSubmit}>
                <input type="text" value={body} placeholder={`Message @${friend?.username}`} onChange={e => setBody(e.target.value)}/>
            </form>
        </div>
    )
}

export default PrivateMessagesList;
