import './Message.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage, deleteMessage } from '../../../../store/message';
import { useState } from 'react';

const Message = ({message, prevMessage, deleteButtonVisible, editButtonVisible}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [editMessage, setEditMessage] = useState(false);
    const [newBody, setNewBody] = useState(message.body);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const today = new Date();
        const startOfToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).getTime();

        const startOfYesterday = startOfToday - (1000 * 60 * 60 * 24);

        const formattedTime = date.toLocaleTimeString([], {timeStyle: 'short'}) // "1:15 AM"

        let formattedDateTime;

        if (date.getTime() > startOfToday) {
            formattedDateTime = `Today at ${formattedTime}`;
        } else if (date.getTime() > startOfYesterday) {
            formattedDateTime = `Yesterday at ${formattedTime}`;
        } else {
            formattedDateTime = `${date.toLocaleDateString()} ${formattedTime}`;
        }
        return formattedDateTime
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const formattedTime = date.toLocaleTimeString([], {timeStyle: 'short'}) // "1:15 AM"
        return formattedTime
    }

    const handleDeleteMessage = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteMessage(message.id, message.channelId));
    }

    const handleUpdateMessage = e => {
        e.preventDefault();
        if (newBody.length > 0){
            message.body = newBody;
            dispatch(updateMessage(message))
            setEditMessage(false);
        } else {
            dispatch(deleteMessage(message.id, message.channelId));
        }
    }

    const resetMessage = e => {
        e.preventDefault();
        setNewBody(message.body);
        setEditMessage(false);
    }

    const enableEdit = () => {
        setEditMessage(true)
        document.addEventListener("click", clickListener)
    }

    const clickListener = e => {
        if (e.target.className.baseVal !== 'message-edit-icon' &&
                e.target.className !== 'message-editor-input' &&
                e.target.className !== 'message-editor'){
            document.removeEventListener("click", clickListener)
            resetMessage(e);
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const messageBody = () => {
        if (editMessage) {
            return (
                <form className='message-editor'
                      onSubmit={handleUpdateMessage}
                      onKeyDown={e => {if (e.key === "Escape") {resetMessage(e) }}}>
                    <input className="message-editor-input"
                           type="text"
                           value={newBody}
                           onChange={e => setNewBody(e.target.value)}/>
                </form>
            )
        } else {
            return (
                <span className='message-body'>
                    <div>
                        {message.body}
                        {message.createdAt !== message.updatedAt ? <span className="message-edited">&nbsp;&nbsp;(edited)</span> : <></>}
                    </div>
                    {editButtonVisible ? <div className="message-button-holder">
                            <div className='message-edit-button' onClick={enableEdit}>
                                <svg className='message-edit-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> <path className='message-edit-icon' d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
                            </div>
                            <div className='message-delete-button' onClick={handleDeleteMessage}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                            </div>
                        </div> :
                        deleteButtonVisible ? <div className="message-button-holderV2">
                            <div className='message-delete-button' onClick={handleDeleteMessage}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                            </div>
                        </div> : null}
                </span>
            )
        }
    }

    if (!prevMessage) {
        return (
            <div className='message-holder'>
                {users[message.authorId].photoUrl ?
                    <img className='user-item-img' src={users[message.authorId].photoUrl} alt={users[message.authorId].username}/>:
                    ((users[message.authorId].color) ?
                    <div style={{backgroundColor: users[message.authorId].color}} className='user-item-img-placeholder'>{`${users[message.authorId].username.toUpperCase().charAt(0)}`}</div> :
                    <div className='user-item-img-placeholder'>{`${users[message.authorId].username.toUpperCase().charAt(0)}`}</div>)
                }
                <div className='message-main'>
                    <span className='message-user-info'>
                        {users[message.authorId].username}
                        <span className='message-datetime'>{formatDate(message.createdAt)}</span>
                    </span>
                    {messageBody()}
                </div>
            </div>
        )
    } else if (prevMessage && prevMessage.authorId !== message.authorId) {
        return (
            <div className='message-holder'>
                {users[message.authorId].photoUrl ?
                    <img className='user-item-img' src={users[message.authorId].photoUrl} alt={users[message.authorId].username}/>:
                    ((users[message.authorId].color) ?
                    <div style={{backgroundColor: users[message.authorId].color}} className='user-item-img-placeholder'>{`${users[message.authorId].username.toUpperCase().charAt(0)}`}</div> :
                    <div className='user-item-img-placeholder'>{`${users[message.authorId].username.toUpperCase().charAt(0)}`}</div>)
                }
                <div className='message-main'>
                    <span className='message-user-info'>
                        {users[message.authorId].username}
                        <span className='message-datetime'>{formatDate(message.createdAt)}</span>
                    </span>
                    {messageBody()}
                </div>
            </div>
        )
    } else {
        return (
            <div className='message-holderV2'>
                <span className='message-time'>{formatTime(message.createdAt)}</span>
                <div className='message-main'>
                    {messageBody()}
                </div>
            </div>
        )
    }

}

export default Message
