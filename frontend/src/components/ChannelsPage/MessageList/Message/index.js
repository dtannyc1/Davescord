import './Message.css'
import { useSelector } from 'react-redux';

const Message = ({message, prevMessage, buttonsVisible}) => {
    const users = useSelector(state => state.users);

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

    if (prevMessage && prevMessage.authorId !== message.authorId) {
        return (
            <div className='message-holder'>
                <img className='user-item-img' src={users[message.authorId].profilePicture} alt={users[message.authorId].username}/>
                <div className='message-main'>
                    <span className='message-user-info'>
                        {users[message.authorId].username}
                        <span className='message-datetime'>{formatDate(message.createdAt)}</span>
                    </span>
                    <span className='message-body'>{message.body}</span>
                    {buttonsVisible ? <div className="message-button-holder">button</div> : null}
                </div>
            </div>
        )
    } else {
        return (
            <div className='message-holderV2'>
                <span className='message-time'>{formatTime(message.createdAt)}</span>
                <div className='message-main'>
                    <span className='message-body'>{message.body}</span>
                    {buttonsVisible ? <div className="message-button-holder">button</div> : null}
                </div>
            </div>
        )
    }

}

export default Message
